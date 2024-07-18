import { ApiProperty } from '@nestjs/swagger';


export class AutoSalonResDto {
  @ApiProperty({
    example: '121324354678976543fdg',
    description: 'The id of the User',
  })
  id: string;

  @ApiProperty({
    example: 'AutoRiaSalon',
    description: 'The name of the AutoSalon',
  })
  public readonly name: string;
  @ApiProperty({
    example: 'AutoRiaSalon',
    description: 'The name of the AutoSalon',
  })
  carSalon_id;

  @ApiProperty({
    example: 'carSalon_id',
    description: 'carSalon_id',
  })
  userSalon_id;

  @ApiProperty({
    example: 'userSalonRole',
    description: 'userSalonRole',
  })
  userSalonRole;

  carId?: string;
  userId?: string;
  userRole?: string;
}
