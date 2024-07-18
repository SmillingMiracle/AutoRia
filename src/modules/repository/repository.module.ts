import { Global, Module } from '@nestjs/common';
import { AutoSalonRepository } from './services/autoSalon.repository';
import { BanRepository } from './services/ban.repository';

import { CarRepository } from './services/car.repository';
import { ExchangeRepository } from './services/exchange.repository';
import { MessageRepository } from './services/message.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { StatsRepository } from './services/stats.repository';
import { ViewRepository } from './services/view.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  CarRepository,
  RefreshTokenRepository,
  ViewRepository,
  UserRepository,
  ExchangeRepository,
  MessageRepository,
  BanRepository,
  StatsRepository,
  AutoSalonRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
