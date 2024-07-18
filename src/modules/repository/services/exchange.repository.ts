import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ExchangeEntity } from '../../../database/entities/exchange.entity';

@Injectable()
export class ExchangeRepository extends Repository<ExchangeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ExchangeEntity, dataSource.manager);
  }
}
