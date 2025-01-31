import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { Match } from './interfaces/match.interface';
import { newRank, winProbability } from './utils/match-calculation';

/**
 * Résultat d'un match
 */
enum Result {
    WIN = 1,
    LOSS = 0,
    DRAW = 0.5,
}

/**
 * Service de classement
 */
@Injectable()
export class RankingService {
    private readonly rankings: Player[] = [];
    private readonly matches: Match[] = [];

    /**
     * Ajoute un joueur au classement
     * @param player Joueur à ajouter
     */
    addPlayer(player: Player): void {
        player.rank =
            this.rankings.length === 0
                ? 0
                : this.rankings.reduce((acc, player) => acc + player.rank, 0) /
                  this.rankings.length;

        this.rankings.push(player);
    }

    /**
     * Récupère le classement des joueurs
     * @returns Classement des joueurs
     */
    getRankings(): Player[] {
        return this.rankings;
    }

    /**
     * Ajoute et traite le résultat d'un match
     * @param match Match à ajouter
     */
    addMatch(match: Match): void {
        console.log(match);
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
