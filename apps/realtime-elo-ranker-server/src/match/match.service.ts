import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { newRank, winProbability } from './utils/match-calculation';

enum Result {
    WIN = 1,
    LOSS = 0,
    DRAW = 0.5,
}

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) {}

    async addMatch(match: Match): Promise<Match> {
        console.log(match);
        const winner = (
            await this.playerRepository.findBy({ id: match.winner })
        )[0];
        const loser = (
            await this.playerRepository.findBy({ id: match.loser })
        )[0];

        if (!winner || !loser) {
            throw new Error('Invalid winner or loser');
        }

        console.log(winner, loser);
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

        console.log(winner.rank, loser.rank);

        await this.playerRepository.save(winner);
        await this.playerRepository.save(loser);

        return this.matchRepository.save(match);
    }
}
