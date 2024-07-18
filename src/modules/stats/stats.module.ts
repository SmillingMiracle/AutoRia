import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CarModule } from '../car/car.module';

import { CarService } from '../car/services/car.service';
import { CarRepository } from '../repository/services/car.repository';
import { ViewRepository } from '../repository/services/view.repository';
import { StatsService } from './services/stats.service';
import { StatsController } from './stats.controller';

@Module({
  imports: [],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
