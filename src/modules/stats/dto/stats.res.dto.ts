import { CarResDto } from '../../car/dto/res/car.res.dto';

export class StatsResDto {
  totalViews: number;
  dailyViews: number;
  weeklyViews: number;
  monthlyViews: number;
  avgPriceRegion: number;
  avgPriceCountry: number;
}
