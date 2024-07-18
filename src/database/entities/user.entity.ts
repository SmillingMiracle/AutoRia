import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AutoSalonEntity } from './autoSalons.entity';
import { BanEntity } from './ban.entity';
import { CarEntity } from './car.entity';
import { UserRole } from './enums/role.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { MessageEntity } from './message.entity';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { ViewEntity } from './view.entity';

@Entity({ name: TableNameEnum.USERS })
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column({ type: 'text', enum: UserRole, default: UserRole.USER })
  role: string;

  @Column('text', { nullable: true })
  type: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  @OneToMany(() => ViewEntity, (entity) => entity.user)
  view?: ViewEntity[];

  @OneToMany(() => MessageEntity, (entity) => entity.user)
  message?: MessageEntity[];

  @OneToOne(() => BanEntity, (entity) => entity.user)
  banned?: BanEntity;

  @ManyToOne(() => AutoSalonEntity, (entity) => entity.userSalon_id)
  autoSalon_id?: string;

  @ManyToOne(() => AutoSalonEntity, (entity) => entity.userSalonRole)
  autoSalonRole?: string;
}
