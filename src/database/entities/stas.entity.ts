import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  VirtualColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.STATS })
export class StatsEntity extends BaseModel {
  @Column({ nullable: true })
  totalViews?: number;

  @Column({ nullable: true })
  dailyViews?: number;

  @Column({ nullable: true })
  weeklyViews?: number;

  @Column({ nullable: true })
  monthlyViews?: number;

  @Column({ nullable: true })
  avgPriceRegion?: number;

  @Column({ nullable: true })
  avgPriceCountry?: number;

  @ManyToMany(() => CarEntity, (entity) => entity.stats)
  @JoinTable()
  car?: CarEntity[];
}
