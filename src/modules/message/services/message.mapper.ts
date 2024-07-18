import { MessageEntity } from '../../../database/entities/message.entity';
import { MessageReqDto } from '../dto/message.req.dto';

export class MessageMapper {
  public static toResponseDTO(message: MessageEntity): MessageReqDto {
    return {
      message: message.message,
    };
  }
}
