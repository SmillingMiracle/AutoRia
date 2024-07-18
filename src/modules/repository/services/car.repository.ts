import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarListReqDto } from '../../car/dto/req/car-list.req.dto';
import { CreateCarReqDto } from '../../car/dto/req/create-car.req.dto';
import { UpdateCarReqDto } from '../../car/dto/req/update-car.req.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }
  public containsInappropriateLanguage(
    dto: CreateCarReqDto | UpdateCarReqDto,
  ): boolean {
    //слова з лексикою
    const inappropriateWords = ['duck', 'beach'];
    // Поля, які потрібно перевірити без ціни
    const fieldsToCheck = ['brand', 'model', 'description', 'body'];
    for (const field of fieldsToCheck) {
      if (
        dto[field] &&
        inappropriateWords.some((word) =>
          dto[field].toLowerCase().includes(word),
        )
      ) {
        return true;
      }
    }

    return false;
  }
  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('car.exchange', 'exchange');
    qb.leftJoinAndSelect('car.view', 'view');

    qb.setParameter('myId', userData.userId);

    if (query.search) {
      qb.andWhere(
        `CONCAT(
        LOWER(car.brand), 
        LOWER(car.model), 
        LOWER(car.description), 
        LOWER(car.body)
      ) LIKE :search`,
        { search: `%${query.search.toLowerCase()}%` },
      );
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.orderBy('car.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findCarById(carId: string): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.exchange', 'exchange');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('car.view', 'view');

    qb.where('car.id = :carId');
    qb.setParameter('carId', carId);

    // //  для підрахунку загальної кількості переглядів
    // const totalViewsQb = this.createQueryBuilder('view')
    //   .select('COUNT(view.id)', 'totalViews')
    //   .where('view.car_id = :carId');
    //
    // // для підрахунку кількості переглядів за день
    // const dayViewsQb = this.createQueryBuilder('view')
    //   .select('COUNT(view.id)', 'dayViews')
    //   .where('view.car_id = :carId')
    //   .andWhere("view.created_at > NOW() - INTERVAL '1 DAY'");
    //
    // // для підрахунку кількості переглядів за тиждень
    // const weekViewsQb = this.createQueryBuilder('view')
    //   .select('COUNT(view.id)', 'weekViews')
    //   .where('view.car_id = :carId')
    //   .andWhere("view.created_at > NOW() - INTERVAL '1 WEEK'");
    //
    // //  для підрахунку кількості переглядів за місяць
    // const monthViewsQb = this.createQueryBuilder('view')
    //   .select('COUNT(view.id)', 'monthViews')
    //   .where('view.car_id = :carId')
    //   .andWhere("view.created_at > NOW() - INTERVAL '1 MONTH'");
    //
    // qb.addSelect(`(${totalViewsQb.getQuery()})`, 'totalViews');
    // qb.addSelect(`(${dayViewsQb.getQuery()})`, 'dayViews');
    // qb.addSelect(`(${weekViewsQb.getQuery()})`, 'weekViews');
    // qb.addSelect(`(${monthViewsQb.getQuery()})`, 'monthViews');

    return await qb.getOne();
  }
}
