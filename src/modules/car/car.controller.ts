import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserType } from '../auth/decorators/type-user.decorator';
import { TypesGuard } from '../auth/guards/type.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { MessageReqDto } from '../message/dto/message.req.dto';
import { StatsResDto } from '../stats/dto/stats.res.dto';
import { CarListReqDto } from './dto/req/car-list.req.dto';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarListResDto } from './dto/res/car-list.res.dto';
import { CarService } from './services/car.service';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarListReqDto,
  ): Promise<CarListResDto> {
    return await this.carService.getList(userData, query);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.create(userData, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('image', false)
  @Post(':carId/imageUpload')
  public async uploadImage(
    @Param('carId', ParseUUIDPipe) carId: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.carService.uploadImage(carId, image);
  }
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':carId/imageDelete')
  public async deleteImage(
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.carService.deleteImage(carId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':carId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<CarResDto> {
    await this.carService.createView(userData, carId);
    return await this.carService.getById(carId);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UserType('PREMIUM')
  @UseGuards(TypesGuard)
  @Get(':carId/stats')
  public async getStats(
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<StatsResDto> {
    return await this.carService.getStats(carId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':carId/message')
  public async createMessage(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() dto: MessageReqDto,
  ): Promise<void> {
    await this.carService.createMessage(userData, carId, dto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Put(':carId')
  public async updateById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.updateById(userData, carId, dto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':carId')
  public async deleteById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.carService.deleteById(userData, carId);
  }
}
