import { CarEntity } from '../../../../database/entities/car.entity';

export class ExchangeResDto {
  originalPrice: number;
  originalCurrency: string;
  priceInUSD: number;
  priceInEUR: number;
  priceInUAH: number;
  exchangeRateUSD: number;
  exchangeRateEUR: number;
  exchangeRateUAH: number;
}
