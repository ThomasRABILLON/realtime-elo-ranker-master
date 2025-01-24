/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingError } from './interfaces/ranking.error.interface';
import { Player } from './interfaces/player.interface';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingService: RankingService) {}

  @Get()
  async getRankings(): Promise<Player[] | RankingError> {
    return this.rankingService.getRankings();
  }
}
