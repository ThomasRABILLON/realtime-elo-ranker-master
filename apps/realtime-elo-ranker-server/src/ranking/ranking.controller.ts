import { Controller, Get, Sse } from '@nestjs/common';
import { Player } from '../player/entities/player.entity';
import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
    constructor(
        private rankingService: RankingService,
        private eventEmitter: EventEmitter2,
    ) {}

    @Get()
    getRanking(): Promise<Player[]> {
        return this.rankingService.getRanking();
    }

    @Sse('/events')
    sse(): Observable<MessageEvent> {
        return new Observable((subscriber) => {
            const onPlayerUpdated = (player: Player) => {
                const event: MessageEvent = new MessageEvent('message', {
                    data: { type: 'RankingUpdate', player: player },
                });
                subscriber.next(event);
            };

            const onError = (error: Error) => {
                const event: MessageEvent = new MessageEvent('message', {
                    data: { type: 'Error', message: error.message },
                });
                subscriber.next(event);
            };

            this.eventEmitter.on('player.updated', onPlayerUpdated);
            this.eventEmitter.on('player.added', onPlayerUpdated);

            this.eventEmitter.on('player.error', onError);
        });
    }
}
