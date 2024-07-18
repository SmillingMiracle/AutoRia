import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { plainToClass } from 'class-transformer';
import fetch from 'node-fetch';

import { CarEntity } from '../../../database/entities/car.entity';
import { ExchangeEntity } from '../../../database/entities/exchange.entity';
import { CarMapper } from '../../car/services/car.mapper';
import { CarService } from '../../car/services/car.service';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { ExchangeRepository } from '../../repository/services/exchange.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { StatsResDto } from '../dto/stats.res.dto';

@Injectable()
export class StatsService {
  constructor() {}
}
