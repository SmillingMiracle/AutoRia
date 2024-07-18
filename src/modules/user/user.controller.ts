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

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/role-auth.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BanReqDto } from '../ban/dto/ban.req.dto';
import { MessageReqDto } from '../message/dto/message.req.dto';
import { ChangeRoleReqDto } from './dto/req/change-role.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserService } from './services/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get('profile')
  @Roles('USER')
  @UseGuards(RolesGuard)
  public async getMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return await this.userService.getMe(userData);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Put('profile')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete('mprofilee')
  public async remove(
    @CurrentUser() userData: IUserData,
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.userService.remove(userId);
  }

  @SkipAuth()
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':userId')
  public async getById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    return await this.userService.getById(userId);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post(':userId/editRole')
  public async changeRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: ChangeRoleReqDto,
  ): Promise<UserResDto> {
    return await this.userService.changeRole(userId, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':userId/ban')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  public async banById(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: BanReqDto,
  ): Promise<UserResDto> {
    return await this.userService.banById(userId, dto);
  }
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':userId/getPremium')
  public async getPremium(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    return await this.userService.getPremium(userId);
  }
}
