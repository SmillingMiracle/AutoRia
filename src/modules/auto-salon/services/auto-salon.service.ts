import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CarEntity } from 'src/database/entities/car.entity'; // Імпортуйте модель CarEntity
import { DeepPartial } from 'typeorm';

import { CarService } from '../../car/services/car.service';
import { AutoSalonRepository } from '../../repository/services/autoSalon.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { UserService } from '../../user/services/user.service';
import { AutoSalonReqDto } from '../dto/req/autoSalon.req.dto';
import { AutoSalonResDto } from '../dto/res/autoSalon.res.dto';
import { AutoSalonMapper } from './auto-salon.mapper';

@Injectable()
export class AutoSalonService {
  constructor(private autoSalonRepository: AutoSalonRepository) {}

  public async getSalonById(autoSalonId): Promise<AutoSalonResDto> {
    const autoSalon = await this.autoSalonRepository.findOneBy({
      id: autoSalonId,
    });
    if (!autoSalon) {
      throw new NotFoundException('Auto Salon not found');
    }
    return AutoSalonMapper.toResponseDTO(autoSalon);
  }

  public async create(carId, userId, dto): Promise<AutoSalonReqDto> {
    const autoSalon = await this.autoSalonRepository.save(
      this.autoSalonRepository.create({
        name: dto.name,
        carSalon_id: carId,
        userSalon_id: userId,
        userSalonRole: dto.userSalonRole,
        carId: carId,
        userId: userId,
        userRole: dto.userSalonRole,
      }),
    );
    return await this.getSalonById(autoSalon.id);
  }
}
