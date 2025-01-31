import { Player } from '../interfaces/player.interface';

export class CreatePlayerDto implements Player {
    readonly id: string;
    readonly rank: number = 0;
}
