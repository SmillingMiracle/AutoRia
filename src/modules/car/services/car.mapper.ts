import { ConfigStaticService } from '../../../configs/config.static';
import { CarEntity } from '../../../database/entities/car.entity';
import { ExchangeMapper } from '../../exchange/services/exchange.mapper';
import { ExchangeService } from '../../exchange/services/exchange.service';
import { MessageMapper } from '../../message/services/message.mapper';
import { StatsMapper } from '../../stats/services/stats.mapper';
import { UserMapper } from '../../user/services/user.mapper';
import { ViewMapper } from '../../view/services/view.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    const awsConfig = ConfigStaticService.get().aws;
    return {
      id: entity.id,
      brand: entity.brand,
      model: entity.model,
      price: entity.price,
      currency: entity.currency,
      locate: entity.locate,
      description: entity.description,
      body: entity.body,
      created: entity.created,
      updated: entity.updated,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
      exchange: entity.exchange ? ExchangeMapper.toResponseDTO(entity.exchange): null,
      image: entity.image ? `${awsConfig.bucketUrl}/${entity.image}` : null,
      view: entity.view ? entity.view.map((view) => view.user_id) : [],
      message: entity.message ? MessageMapper.toResponseDTO(entity.message) : null,
      isActive: entity.isActive,
      //stats: entity.stats? StatsMapper.toResponseDTO(entity.stats) : null
    };
  }
  public static toListResponseDTO(
    entities: CarEntity[],
    total: number,
    query: CarListReqDto,
  ): CarListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    };
  }
}
