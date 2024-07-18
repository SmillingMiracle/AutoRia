import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/role.guard';
import { ExchangeModule } from '../exchange/exchange.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { StatsModule } from '../stats/stats.module';
import { UserModule } from '../user/user.module';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';

@Module({
  imports: [
    ExchangeModule,
    FileStorageModule,
    forwardRef(() => AuthModule),
    UserModule,
  ],
  controllers: [CarController],
  providers: [CarService, RolesGuard],
  exports: [CarService],
})
export class CarModule {}
