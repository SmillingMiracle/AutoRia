import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ExchangeEntity } from '../../../database/entities/exchange.entity';
import { StatsEntity } from '../../../database/entities/stas.entity';

@Injectable()
export class StatsRepository extends Repository<StatsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatsEntity, dataSource.manager);
  }
}
