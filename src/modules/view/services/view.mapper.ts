import { ViewEntity } from '../../../database/entities/view.entity';
import { ViewResDto } from '../dto/view.res.dto';

export class ViewMapper {
  public static toResponseDTO(view: ViewEntity): ViewResDto {
    return {
      id: view.id,
      created: view.created,
      updated: view.updated,
      car_id: view.car_id,
      user_id: view.user_id,
    };
  }
}
