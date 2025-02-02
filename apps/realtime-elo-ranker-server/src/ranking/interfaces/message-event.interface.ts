import { Player } from '../../player/entities/player.entity';

export interface RankingMessageEvent {
    type: string;
    player: Player;
}
