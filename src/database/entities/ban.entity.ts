import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.BANNED })
export class BanEntity extends BaseModel {
  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.banned)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('text')
  banReason: string;
}
