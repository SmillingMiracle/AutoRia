// src/modules/user/dto/base-user-req.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserRole } from 'src/database/entities/enums/role.enum';
import { UserType } from 'src/database/entities/enums/type.enum';
import { REGEX } from '../../../../common/constants/regex.constants';

export class BaseUserReqDto {
  @ApiProperty({ example: 'Naruto' })
  @IsOptional()
    @IsString()
    @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ enum: ['USER', 'MODERATOR', 'ADMIN'] })
  @IsOptional()
  @IsEnum(UserRole)
  @Length(3, 10)
  role: string;

  @ApiProperty({ enum: ['BASE', 'PREMIUM'] })
  @IsOptional()
  @IsEnum(UserType)
  @Length(3, 10)
  type: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(REGEX.EMAIL)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(0, 300)
  @Matches(REGEX.PASSWORD)
  password: string;
}
