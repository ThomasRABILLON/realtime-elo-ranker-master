import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { Match } from './interfaces/match.interface';

@Injectable()
export class RankingService {
  private readonly rankings: Player[] = [];

  addPlayer(player: Player): void {
    player.rank = 0;
    this.rankings.push(player);
  }

  getRankings(): Player[] {
    return this.rankings;
  }

  addMatch(match: Match): void {
    const winner = this.rankings.find((player) => player.id === match.winner);
    const loser = this.rankings.find((player) => player.id === match.loser);

    if (winner && loser) {
      const k = 32;
      const winnerExpected = 1 / (1 + 10 ** ((loser.rank - winner.rank) / 400));
      const loserExpected = 1 / (1 + 10 ** ((winner.rank - loser.rank) / 400));
      winner.rank += winner.rank + k * (1 - winnerExpected);
      loser.rank += loser.rank + k * (0 - loserExpected);
    }
  }
}
