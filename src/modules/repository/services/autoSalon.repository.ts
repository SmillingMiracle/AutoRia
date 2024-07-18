import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AutoSalonEntity } from '../../../database/entities/autoSalons.entity';

@Injectable()
export class AutoSalonRepository extends Repository<AutoSalonEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AutoSalonEntity, dataSource.manager);
  }
}
