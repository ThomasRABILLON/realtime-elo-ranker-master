import { Injectable } from '@nestjs/common';
import { RankingError } from './interfaces/ranking.error.interface';
import { Player } from './interfaces/player.interface';

@Injectable()
export class RankingService {
  private readonly rankings: Player[] = [];

  addPlayer(player: Player): void {
    player.rank = 0;
    this.rankings.push(player);
  }

  getRankings(): Player[] | RankingError {
    if (this.rankings.length === 0) {
      return JSON.parse(
        '{"code": 0, "message": "No players found"}',
      ) as RankingError;
    }
    return this.rankings;
  }
}
