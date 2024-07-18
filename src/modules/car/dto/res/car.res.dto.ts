import { ApiProperty } from '@nestjs/swagger';

import { ExchangeEntity } from '../../../../database/entities/exchange.entity';
import { ExchangeResDto } from '../../../exchange/dto/res/exchange.res.dto';
import { MessageReqDto } from '../../../message/dto/message.req.dto';
import { StatsResDto } from '../../../stats/dto/stats.res.dto';
import { UserResDto } from '../../../user/dto/res/user.res.dto';
import { ViewResDto } from '../../../view/dto/view.res.dto';

export class CarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'Car model',
    description: 'Car model',
  })
  model: string;

  @ApiProperty({
    example: 'Car brand',
    description: 'Car brand',
  })
  brand: string;

  @ApiProperty({
    example: 'Car price',
    description: 'Car price',
  })
  price: string;

  @ApiProperty({
    example: 'Car currency',
    description: 'Car currency',
  })
  currency: string;

  @ApiProperty({
    example: 'Car locate',
    description: 'Car locate',
  })
  locate: string;

  @ApiProperty({
    example: 'Car Description',
    description: 'Car Description',
  })
  description: string;

  @ApiProperty({
    example: 'Car Body',
    description: 'Car Body',
  })
  body: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Updated Date',
  })
  updated: Date;

  exchange: ExchangeResDto;

  @ApiProperty({
    example: 'https://www.example.com/image.jpg',
    description: 'The image of the Car',
  })
  public readonly image?: string;

  view?: string[];

  user?: UserResDto;

  message?: MessageReqDto;

  stats?: StatsResDto;

  isActive?: boolean;
}
