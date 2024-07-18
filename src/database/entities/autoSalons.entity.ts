import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.AUTOSALONS })
export class AutoSalonEntity extends BaseModel {
  @Column('text')
  name?: string;

  @Column({ nullable: true })
  carId?: string;
  @OneToMany(() => CarEntity, (entity) => entity.autoSalon_id)
  carSalon_id?: string;

  @Column({ nullable: true })
  userId?: string;
  @OneToMany(() => UserEntity, (entity) => entity.autoSalon_id)
  userSalon_id?: string;

  @Column({ nullable: true })
  userRole?: string;
  @OneToMany(() => UserEntity, (entity) => entity.autoSalonRole)
  userSalonRole?: string;
}
