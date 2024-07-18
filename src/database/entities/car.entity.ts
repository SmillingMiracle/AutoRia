import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AutoSalonEntity,} from './autoSalons.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ExchangeEntity } from './exchange.entity';
import { MessageEntity } from './message.entity';
import { BaseModel } from './models/base.model';
import { StatsEntity } from './stas.entity';
import { UserEntity } from './user.entity';
import { ViewEntity } from './view.entity';

@Entity({ name: TableNameEnum.CARS })
export class CarEntity extends BaseModel {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  price: string;

  @Column('text')
  currency: string;

  @Column('text')
  locate: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @OneToMany(() => ViewEntity, (entity) => entity.car)
  view?: ViewEntity[];

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  exchange_id: string;
  @ManyToOne(() => ExchangeEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'exchange_id' })
  exchange?: ExchangeEntity;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => MessageEntity, (entity) => entity.car)
  message?: MessageEntity;

  @ManyToMany(() => StatsEntity, (entity) => entity.car)
  stats?: StatsEntity;

  @Column({ default: 0 })
  editAttempts: number;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => AutoSalonEntity, (entity) => entity.carSalon_id)
  autoSalon_id?: string;
}
