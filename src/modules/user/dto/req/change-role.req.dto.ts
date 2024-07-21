import {IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/database/entities/enums/role.enum';

export class ChangeRoleReqDto {
  @IsEnum(UserRole, { message: 'Write a role' })
  role: UserRole;
}
