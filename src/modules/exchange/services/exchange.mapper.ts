import { ExchangeEntity } from '../../../database/entities/exchange.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { ExchangeRepository } from '../../repository/services/exchange.repository';
import { UserResDto } from '../../user/dto/res/user.res.dto';
import { ExchangeResDto } from '../dto/res/exchange.res.dto';
import { ExchangeService } from './exchange.service';

export class ExchangeMapper {
  public static toResponseDTO(exchange: ExchangeEntity): ExchangeResDto {
    return {
      originalPrice: exchange.originalPrice,
      originalCurrency: exchange.originalCurrency,
      priceInUSD: exchange.priceInUSD,
      priceInEUR: exchange.priceInEUR,
      priceInUAH: exchange.priceInUAH,
      exchangeRateUSD: exchange.exchangeRateUSD,
      exchangeRateEUR: exchange.exchangeRateEUR,
      exchangeRateUAH: exchange.exchangeRateUAH,
    };
  }
}
