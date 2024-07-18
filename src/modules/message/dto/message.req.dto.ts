import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { TransformHelper } from '../../../common/helpers/transform.helper';

export class MessageReqDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  @Transform(TransformHelper.trim)
  message: string;
}
