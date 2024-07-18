import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseCarReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'tesla',
  })
  brand: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'modelX',
  })
  model: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: '9900',
  })
  price: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'EUR',
  })
  currency: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Lviv',
  })
  locate: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'lorem20',
  })
  description: string;

  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'lorem20',
  })
  body: string;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  @ApiProperty({
    example: 'localhost:3000/car/uploadImage',
  })
  image?: string;
}
