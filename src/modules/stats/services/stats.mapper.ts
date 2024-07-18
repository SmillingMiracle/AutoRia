import { StatsEntity } from '../../../database/entities/stas.entity';
import { ViewEntity } from '../../../database/entities/view.entity';
import { StatsResDto } from '../dto/stats.res.dto';

export class StatsMapper {
  public static toResponseDTO(stats: StatsEntity): StatsResDto {
    return {
      totalViews: stats.totalViews,
      dailyViews: stats.dailyViews,
      weeklyViews: stats.weeklyViews,
      monthlyViews: stats.monthlyViews,
      avgPriceRegion: stats.avgPriceRegion,
      avgPriceCountry: stats.avgPriceCountry,
    };
  }
}
