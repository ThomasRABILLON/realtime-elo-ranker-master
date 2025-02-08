import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class RankingService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) {}

    getRanking(): Promise<Player[]> {
        return this.playerRepository.find();
    }
}
