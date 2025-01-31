import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Player } from '../player/entities/player.entity';
import { newRank, winProbability } from './utils/match-calculation';
import { Result } from './utils/result.enum';
import { K } from '../constants';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) {}

    async addMatch(match: Match): Promise<Match> {
        if (match.winner === null || match.loser === null)
            throw new Error('Winner and loser must be provided');
        if (match.winner === match.loser)
            throw new Error('Winner and loser cannot be the same player');

        const [winner, loser] = await Promise.all([
            this.playerRepository.findOneBy({ id: match.winner }),
            this.playerRepository.findOneBy({ id: match.loser }),
        ]);

        if (!winner || !loser) throw new Error('Invalid winner or loser');

        this.updatePlayerRanks(winner, loser, match.draw);

        await Promise.all([
            this.playerRepository.save(winner),
            this.playerRepository.save(loser),
        ]);

        return this.matchRepository.save(match);
    }

    private updatePlayerRanks(winner: Player, loser: Player, draw: boolean) {
        winner.rank = newRank(
            winner.rank,
            K,
            draw ? Result.DRAW : Result.WIN,
            winProbability(winner.rank, loser.rank),
        );
        loser.rank = newRank(
            loser.rank,
            K,
            draw ? Result.DRAW : Result.LOSS,
            winProbability(loser.rank, winner.rank),
        );
    }
}
