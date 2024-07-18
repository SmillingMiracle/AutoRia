import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StatsService } from './services/stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
}
