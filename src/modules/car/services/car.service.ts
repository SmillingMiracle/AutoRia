import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { In, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { ExchangeEntity } from '../../../database/entities/exchange.entity';
import { ViewEntity } from '../../../database/entities/view.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ExchangeService } from '../../exchange/services/exchange.service';
import { ContentType } from '../../file-storage/models/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { LoggerService } from '../../logger/logger.service';
import { MessageReqDto } from '../../message/dto/message.req.dto';
import { CarRepository } from '../../repository/services/car.repository';
import { ExchangeRepository } from '../../repository/services/exchange.repository';
import { MessageRepository } from '../../repository/services/message.repository';
import { StatsRepository } from '../../repository/services/stats.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { StatsResDto } from '../../stats/dto/stats.res.dto';
import { StatsService } from '../../stats/services/stats.service';
import { UserService } from '../../user/services/user.service';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarMapper } from './car.mapper';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly carRepository: CarRepository,
    private readonly viewRepository: ViewRepository,
    private readonly exchangeService: ExchangeService,
    private readonly messageRepository: MessageRepository,
    private readonly statsRepository: StatsRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carRepository.getList(userData, query);
    return CarMapper.toListResponseDTO(entities, total, query);
  }
  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    // шукає Юзера і добавляє табличку з CAR
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
      relations: ['cars'],
    });

    if (user.type !== 'PREMIUM' && user.cars.length >= 1) {
      throw new HttpException(
        'З базовим акаунтом ви можете виставити лише одне авто на продаж. Для більших можливостей придбайте Premium',
        HttpStatus.BAD_REQUEST,
      );
    }

    const exchange = await this.exchangeService.createExchange(
      dto.price,
      dto.currency,
    );
    const exchangeId = await this.exchangeService.getThisId();
    const isActive = this.carRepository.containsInappropriateLanguage(dto);
    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        exchange_id: exchangeId,
        isActive: isActive,
      }),
    );
    if (isActive) {
      throw new HttpException(
        'Ваше оголошення містить нецензурні слова. Будь ласка, відредагуйте його.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return CarMapper.toResponseDTO(car);
  }

  public async createMessage(
    userData: IUserData,
    carId: string,
    dto: MessageReqDto,
  ): Promise<void> {
    await this.messageRepository.save(
      this.messageRepository.create({
        message: dto.message,
        car_id: carId,
        user_id: userData.userId,
      }),
    );
  }

  public async createView(userData: IUserData, carId: string): Promise<void> {
    await this.viewRepository.save(
      this.viewRepository.create({
        car_id: carId,
        user_id: userData.userId,
      }),
    );
  }

  public async getById(carId: string): Promise<CarResDto> {
    const car = await this.carRepository.findCarById(carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return CarMapper.toResponseDTO(car);
  }

  public async updateById(
    userData: IUserData,
    carId: string,
    dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    const car = await this.findMyCarByIdOrThrow(userData.userId, carId);

    if (car.editAttempts >= 3) {
      throw new HttpException(
        'Ви вичерпали ліміт спроб редагування.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const containsInappropriate =
      this.carRepository.containsInappropriateLanguage(dto);
    car.editAttempts += 1;

    if (containsInappropriate) {
      if (car.editAttempts < 3) {
        await this.carRepository.save({ ...car, ...dto });
        throw new HttpException(
          'Ваше оголошення містить нецензурні слова. Будь ласка, відредагуйте його.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        car.isActive = false;
        await this.carRepository.save(car); // Save deactivation status

        await this.messageRepository.save(
          this.messageRepository.create({
            message: `Користувач ${userData.userId} 3тій раз зредагував оголошення`,
            car_id: carId,
            //сюди при вже сформаованій базі даних добавити id менеджера
            user_id: userData.userId,
          }),
        );

        throw new HttpException(
          'Ваше оголошення містить нецензурні слова і було деактивовано. Зверніться будь ласка до менеджера',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      car.isActive = true;
      car.editAttempts = 0; // Скидаємо лічильник спроб, якщо редагування успішне
    }

    await this.carRepository.save({ ...car, ...dto });
    const updatedCar = await this.carRepository.findCarById(carId);
    return CarMapper.toResponseDTO(updatedCar);
  }

  public async deleteById(userData: IUserData, carId: string): Promise<void> {
    const car = await this.findMyCarByIdOrThrow(userData.userId, carId);
    await this.carRepository.remove(car);
  }

  public async findMyCarByIdOrThrow(
    userId: string,
    carId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({
      id: carId,
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }

  public async uploadImage(
    carId: string,
    file: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      carId,
    );
    await this.carRepository.update(carId, { image });
  }

  public async deleteImage(carId: string): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
      await this.carRepository.save(
        this.carRepository.merge(car, { image: null }),
      );
    }
  }
  public async getStats(carId: string): Promise<StatsResDto> {
    const carDto = await this.getById(carId);

    if (!carDto) {
      throw new NotFoundException('Car not found');
    }

    const car = plainToClass(CarEntity, carDto);

    const totalViews = await this.getTotalViews(car);
    const dailyViews = await this.getDailyViews(car);
    const weeklyViews = await this.getWeeklyViews(car);
    const monthlyViews = await this.getMonthlyViews(car);
    const avgPriceRegion = await this.getAvgPriceByRegion(car.locate);
    const avgPriceCountry = await this.getAvgPriceByCountry();

    const stats: StatsResDto = {
      totalViews: Math.round(totalViews),
      dailyViews: Math.round(dailyViews),
      weeklyViews: Math.round(weeklyViews),
      monthlyViews: Math.round(monthlyViews),
      avgPriceRegion: Math.round(avgPriceRegion),
      avgPriceCountry: Math.round(avgPriceCountry),
    };
    await this.statsRepository.save(
      this.statsRepository.create({
        totalViews: stats.totalViews,
        dailyViews: stats.dailyViews,
        weeklyViews: stats.weeklyViews,
        monthlyViews: stats.monthlyViews,
        avgPriceRegion: stats.avgPriceRegion,
        avgPriceCountry: stats.avgPriceCountry,
      }),
    );
    console.log(stats);
    return stats;
  }

  private async getTotalViews(car: CarEntity): Promise<number> {
    const totalViews = await this.viewRepository.count({
      where: { car_id: car.id },
    });
    return totalViews;
  }

  private async getDailyViews(car: CarEntity): Promise<number> {
    const dailyViews = await this.viewRepository
      .createQueryBuilder('view')
      .where('view.car = :carId', { carId: car.id })
      .andWhere("view.created > NOW() - INTERVAL '1 DAY'")
      .getCount();
    return dailyViews;
  }

  private async getWeeklyViews(car: CarEntity): Promise<number> {
    const weeklyViews = await this.viewRepository
      .createQueryBuilder('view')
      .where('view.car = :carId', { carId: car.id })
      .andWhere("view.created > NOW() - INTERVAL '1 WEEK'")
      .getCount();
    return weeklyViews;
  }

  private async getMonthlyViews(car: CarEntity): Promise<number> {
    const monthlyViews = await this.viewRepository
      .createQueryBuilder('view')
      .where('view.car = :carId', { carId: car.id })
      .andWhere("view.created > NOW() - INTERVAL '1 MONTH'")
      .getCount();
    return monthlyViews;
  }

  private async getAvgPriceByRegion(locate: string): Promise<number> {
    const avgPrice = await this.carRepository
      .createQueryBuilder('car')
      .select('AVG(CAST(car.price AS FLOAT))', 'avgPrice')
      .where('car.locate = :locate', { locate })
      .getRawOne();
    return avgPrice.avgPrice;
  }

  private async getAvgPriceByCountry(): Promise<number> {
    const avgPrice = await this.carRepository
      .createQueryBuilder('car')
      .select('AVG(CAST(car.price AS FLOAT))', 'avgPrice')
      .getRawOne();
    return avgPrice.avgPrice;
  }
}
