import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { BanReqDto } from '../../ban/dto/ban.req.dto';
import { LoggerService } from '../../logger/logger.service';
import { BanRepository } from '../../repository/services/ban.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ChangeRoleReqDto } from '../dto/req/change-role.req.dto';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserMapper } from './user.mapper';
import { UserRole } from 'src/database/entities/enums/role.enum';
import { UserType } from 'src/database/entities/enums/type.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly banRepository: BanRepository,
  ) {}

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDTO(user);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const updatedUser = await this.userRepository.save({
      ...user,
      ...dto,
      role: dto.role ? UserRole[dto.role as keyof typeof UserRole] : user.role,
      type: dto.type ? UserType[dto.type as keyof typeof UserType] : user.type
    });
    return UserMapper.toResponseDTO(updatedUser);
  }

  public async getById(userId: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toResponseDTO(user);
  }

  public async remove(userId: string): Promise<void> {}

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }

  public async changeRole(
    userId: string,
    dto: ChangeRoleReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }

    // Оновлення ролі користувача
    const updatedUser = await this.userRepository.save({
      ...user,
      role: dto.role,
    });
    console.log(updatedUser);
    return UserMapper.toResponseDTO(updatedUser);
  }

  public async banById(userId: string, dto: BanReqDto): Promise<UserResDto> {
    await this.banRepository.save(
      this.banRepository.create({
        user_id: userId,
        banReason: dto.banReason,
      }),
    );
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    // Оновлення ролі користувача на 'BANNED'
    const bannedUser = await this.userRepository.save({
      ...user,
      role: UserRole.BANNED,
    });
    console.log(bannedUser);
    return UserMapper.toResponseDTO(bannedUser);
  }

  public async getPremium(userId: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      // Оновлення типу користувача на 'Premium'
      type: UserType.PREMIUM,
    });
    console.log(updatedUser);
    return UserMapper.toResponseDTO(updatedUser);
  }
}
