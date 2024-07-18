import { BanEntity } from '../../../database/entities/ban.entity';
import { BanReqDto } from '../dto/ban.req.dto';

export class BanMapper {
  public static toResponseDTO(ban: BanEntity): BanReqDto {
    return {
      banReason: ban.banReason,
    };
  }
}
