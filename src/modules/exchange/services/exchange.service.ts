import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { ExchangeEntity } from '../../../database/entities/exchange.entity';
import { LoggerService } from '../../logger/logger.service';
import { ExchangeRepository } from '../../repository/services/exchange.repository';
import { ExchangeResDto } from '../dto/res/exchange.res.dto';
import { ExchangeMapper } from './exchange.mapper';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService implements OnModuleInit {
  constructor(
      private readonly logger: LoggerService,
      private readonly exchangeRepository: ExchangeRepository,
      private readonly httpService: HttpService,
      private readonly configService: ConfigService,
  ) {}

  private exchangeRates: { [key: string]: number } = {};

  async onModuleInit() {
    await this.updateExchangeRates();
  }

  @Cron('0 0 * * *') // Виконується щоденно опівночі
  async updateExchangeRates() {
    try {
      const apiUrl = this.configService.get<string>('PRIVATBANK_API_URL');
      const response = await lastValueFrom(
          this.httpService.get(`${apiUrl}pubinfo?json&exchange&coursid=5`),
      );
      const data = response.data;
      data.forEach((rate) => {
        this.exchangeRates[rate.ccy] = parseFloat(rate.buy);
      });
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      throw new HttpException('Failed to fetch exchange rates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getExchangeRate(currency: string) {
    if (!this.exchangeRates[currency]) {
      throw new HttpException('Exchange rate not found', HttpStatus.NOT_FOUND);
    }
    return this.exchangeRates[currency];
  }

  public thisId = '';
  getThisId() {
    return this.thisId;
  }

  async createExchange(price: string, currency: string): Promise<ExchangeResDto> {
    const originalPrice = parseFloat(price);
    const originalCurrency = currency.toUpperCase();

    const exchangeRateUSD = this.getExchangeRate('USD');
    const exchangeRateEUR = this.getExchangeRate('EUR');
    const exchangeRateUAH = 1;

    let priceInUSD, priceInEUR, priceInUAH;

    switch (originalCurrency) {
      case 'USD':
        priceInUSD = originalPrice;
        priceInEUR = originalPrice * (exchangeRateUSD / exchangeRateEUR);
        priceInUAH = originalPrice * exchangeRateUSD;
        break;
      case 'EUR':
        priceInUSD = originalPrice * (exchangeRateEUR / exchangeRateUSD);
        priceInEUR = originalPrice;
        priceInUAH = originalPrice * exchangeRateEUR;
        break;
      case 'UAH':
        priceInUSD = originalPrice * exchangeRateUSD;
        priceInEUR = originalPrice * exchangeRateEUR;
        priceInUAH = originalPrice;
        break;
      default:
        throw new Error('Unsupported currency');
    }

    const savedExchange = await this.exchangeRepository.save(
        this.exchangeRepository.create({
          originalPrice,
          originalCurrency,
          priceInUSD: parseInt(priceInUSD.toString()),
          priceInEUR: parseInt(priceInEUR.toString()),
          priceInUAH: parseInt(priceInUAH.toString()),
          exchangeRateUSD: parseInt(exchangeRateUSD.toString()),
          exchangeRateEUR: parseInt(exchangeRateEUR.toString()),
          exchangeRateUAH: parseInt(exchangeRateUAH.toString()),
        }),
    );
    this.thisId = savedExchange.id;
    return ExchangeMapper.toResponseDTO(savedExchange);
  }
}
