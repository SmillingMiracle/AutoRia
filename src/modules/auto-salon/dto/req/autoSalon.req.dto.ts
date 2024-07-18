import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class AutoSalonReqDto {
  @ApiProperty({ example: 'AutoRiaSalon' })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'Механік' })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  userSalonRole?: string;

  // @ApiProperty({ example: 'carId' })
  // @IsOptional()
  // @IsString()
  // @Length(3, 50)
  // carSalon?: string;
  //
  // @ApiProperty({ example: 'UserId' })
  // @IsOptional()
  // @IsString()
  // @Length(3, 50)
  // userSalon?: string;
}
