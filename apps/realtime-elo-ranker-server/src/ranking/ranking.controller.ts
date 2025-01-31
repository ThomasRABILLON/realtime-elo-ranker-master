import { Controller, Get } from '@nestjs/common';
import { Player } from 'src/player/entities/player.entity';
import { RankingService } from './ranking.service';

@Controller('api/ranking')
export class RankingController {
    constructor(private rankingService: RankingService) {}

    @Get()
    async getRanking(): Promise<Player[]> {
        return this.rankingService.getRanking();
    }
}
