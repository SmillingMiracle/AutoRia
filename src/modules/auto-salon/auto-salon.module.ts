import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/role.guard';
import { CarModule } from '../car/car.module';
import { UserModule } from '../user/user.module';
import { AutoSalonService } from './services/auto-salon.service';
import { AutoSalonController } from './auto-salon.controller';

@Module({
  imports: [forwardRef(() => AuthModule), CarModule, UserModule],
  controllers: [AutoSalonController],
  providers: [AutoSalonService, RolesGuard],
  exports: [AutoSalonService],
})
export class AutoSalonModule {}
