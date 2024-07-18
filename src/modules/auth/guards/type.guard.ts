import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRepository } from '../../repository/services/user.repository';
import { SKIP_AUTH } from '../constants/constants';
import { ROLES_KEY } from '../decorators/role-auth.decorator';
import { TYPES_KEY } from '../decorators/type-user.decorator';
import { TokenType } from '../enums/token-type.enum';
import { AuthMapper } from '../services/auth.mapper';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class TypesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredTypes = this.reflector.getAllAndOverride<string[]>(
        TYPES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredTypes) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const accessToken = request.get('Authorization')?.split('Bearer ')[1];
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      const payload = await this.tokenService.verifyToken(
        accessToken,
        TokenType.ACCESS,
      );
      if (!payload) {
        throw new UnauthorizedException();
      }

      const findTokenInRedis = await this.authCacheService.isAccessTokenExist(
        payload.userId,
        payload.deviceId,
        accessToken,
      );
      if (!findTokenInRedis) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOneBy({
        id: payload.userId,
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = AuthMapper.toUserDataDTO(user, payload.deviceId);
      return requiredTypes.includes(user.type);
      console.log(request.user);
    } catch (e) {
      console.log(e);
      throw new HttpException('You have no permission', HttpStatus.FORBIDDEN);
    }
  }
}
