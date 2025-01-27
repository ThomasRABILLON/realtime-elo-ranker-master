/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from './interfaces/player.interface';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingService: RankingService) {}

  @Get()
  async getRankings(): Promise<Player[]> {
    return this.rankingService.getRankings();
  }
}
