import { Controller, Get, Sse } from '@nestjs/common';
import { Player } from '../player/entities/player.entity';
import { RankingService } from './ranking.service';
import { Observable, fromEventPattern, map, interval, merge } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
    constructor(
        private rankingService: RankingService,
        private eventEmitter: EventEmitter2,
    ) {}

    @Get()
    async getRanking(): Promise<Player[]> {
        return this.rankingService.getRanking();
    }

    @Sse('/events')
    handlePlayerUpdated(): Observable<MessageEvent> {
        const rankingUpdates = fromEventPattern<MessageEvent>(
            (handler) => this.eventEmitter.on('player.updated', handler),
            (handler) => this.eventEmitter.off('player.updated', handler),
        ).pipe(
            map(
                (data) =>
                    new MessageEvent('message', {
                        data: JSON.stringify({
                            player: data,
                            type: 'RankingUpdate',
                        }),
                    }),
            ),
        );

        const heartbeat = interval(1000).pipe(
            map(
                () =>
                    new MessageEvent('message', {
                        data: JSON.stringify({ type: 'ping' }),
                    }),
            ),
        );

        return merge(rankingUpdates, heartbeat);
    }
}
