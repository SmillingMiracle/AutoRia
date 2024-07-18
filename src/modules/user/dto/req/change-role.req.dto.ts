import { IsString } from 'class-validator';

export class ChangeRoleReqDto {
  @IsString({ message: 'Write a role' })
  role: string;
}
