import { Controller, Post, Body } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('api/match')
export class MatchController {
    constructor(private readonly rankingService: RankingService) {}

    @Post()
    addMatch(@Body() createMatchDto: CreateMatchDto) {
        this.rankingService.addMatch(createMatchDto);
    }
}
