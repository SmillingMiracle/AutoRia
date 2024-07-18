import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.MESSAGE })
export class MessageEntity extends BaseModel {
  @Column('text')
  message: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.message)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  car_id: string;
  @ManyToOne(() => CarEntity, (entity) => entity.message)
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;
}
