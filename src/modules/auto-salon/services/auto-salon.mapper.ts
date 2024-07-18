import { AutoSalonEntity } from '../../../database/entities/autoSalons.entity';
import { AutoSalonResDto } from '../dto/res/autoSalon.res.dto';

export class AutoSalonMapper {
  public static toResponseDTO(autoSalon: AutoSalonEntity): AutoSalonResDto {
    return {
      id: autoSalon.id,
      name: autoSalon.name,
      carSalon_id: autoSalon.carSalon_id,
      userSalon_id: autoSalon.userSalon_id,
      userSalonRole: autoSalon.userSalonRole,
      carId: autoSalon.carId,
      userId: autoSalon.userId,
      userRole: autoSalon.userSalonRole,
    };
  }
}
