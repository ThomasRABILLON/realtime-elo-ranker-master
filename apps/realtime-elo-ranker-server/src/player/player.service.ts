import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) {}

    async addPlayer(player: Player): Promise<Player> {
        const players = await this.getPlayers();
        player.rank =
            players.length === 0
                ? 0
                : players.reduce((acc, player) => acc + player.rank, 0) /
                  players.length;

        return this.playerRepository.save(player);
    }

    async getPlayers(): Promise<Player[]> {
        return this.playerRepository.find();
    }
}
