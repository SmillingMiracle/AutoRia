import { Column, Entity, JoinTable, ManyToMany, OneToMany, VirtualColumn } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.EXCHANGE })
export class ExchangeEntity extends BaseModel {
  @Column()
  originalPrice: number;

  @Column()
  originalCurrency: string;

  @Column()
  priceInUSD: number;

  @Column()
  priceInEUR: number;

  @Column()
  priceInUAH: number;

  @Column()
  exchangeRateUSD: number;

  @Column()
  exchangeRateEUR: number;

  @Column()
  exchangeRateUAH: number;

  @ManyToMany(() => CarEntity, (entity) => entity.exchange)
  @JoinTable()
  cars: CarEntity[];

  @VirtualColumn({ query: () => 'NULL' })
  carsCount?: number;
}
