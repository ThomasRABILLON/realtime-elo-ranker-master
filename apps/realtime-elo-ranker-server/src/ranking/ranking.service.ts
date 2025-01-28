import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { Match } from './interfaces/match.interface';
import { newRank, winProbability } from './utils/match-calculation';

enum Result {
    WIN = 1,
    LOSS = 0,
    DRAW = 0.5,
}

@Injectable()
export class RankingService {
    private readonly rankings: Player[] = [];
    private readonly matches: Match[] = [];

    addPlayer(player: Player): void {
        player.rank = 0;
        this.rankings.push(player);
    }

    getRankings(): Player[] {
        return this.rankings;
    }

    addMatch(match: Match): void {
        const winner = this.rankings.find(
            (player) => player.id === match.winner,
        );
        const loser = this.rankings.find((player) => player.id === match.loser);

        if (winner && loser) {
            const k = 32;
            winner.rank = newRank(
                winner.rank,
                k,
                match.draw ? Result.DRAW : Result.WIN,
                winProbability(winner.rank, loser.rank),
            );
            loser.rank = newRank(
                loser.rank,
                k,
                match.draw ? Result.DRAW : Result.LOSS,
                winProbability(loser.rank, winner.rank),
            );

            this.matches.push(match);
        }
    }
}
