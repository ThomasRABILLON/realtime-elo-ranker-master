import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        private eventEmitter: EventEmitter2,
    ) {}

    async addPlayer(player: Player): Promise<Player> {
        const players = await this.getPlayers();
        player.rank = Math.round(
            players.length === 0
                ? 0
                : players.reduce((acc, player) => acc + player.rank, 0) /
                      players.length,
        );

        return this.playerRepository
            .save(player)
            .then((player) => {
                this.eventEmitter.emit('player.added', player);
                return player;
            })
            .catch((error) => {
                this.eventEmitter.emit('player.error', error);
                throw new Error('Failed to add player');
            });
    }

    async getPlayers(): Promise<Player[]> {
        return this.playerRepository.find();
    }
}
