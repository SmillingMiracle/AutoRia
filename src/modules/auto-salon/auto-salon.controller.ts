import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AutoSalonReqDto } from './dto/req/autoSalon.req.dto';
import { AutoSalonResDto } from './dto/res/autoSalon.res.dto';
import { AutoSalonService } from './services/auto-salon.service';

@ApiBearerAuth()
@ApiTags('AutoSalon')
@Controller('AutoSalon')
export class AutoSalonController {
  constructor(private readonly autoSalonService: AutoSalonService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':autoSalonId')
  public async getAutoSalon(
    @Param('autoSalonId', ParseUUIDPipe) autoSalonId: string,
  ): Promise<AutoSalonResDto> {
    return await this.autoSalonService.getSalonById(autoSalonId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':carId/:userId')
  public async createAutoSalon(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: AutoSalonReqDto,
  ): Promise<AutoSalonReqDto> {
    return await this.autoSalonService.create(carId, userId, dto);
  }
}
