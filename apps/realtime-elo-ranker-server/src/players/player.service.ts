import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  private readonly players: Player[] = [];

  create(player: Player) {
    this.players.push(player);
  }

  findAll(): Player[] {
    return this.players;
  }
}
