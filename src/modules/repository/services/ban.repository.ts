import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BanEntity } from '../../../database/entities/ban.entity';

@Injectable()
export class BanRepository extends Repository<BanEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BanEntity, dataSource.manager);
  }
}
