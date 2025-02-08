import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    create(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
        return this.matchService
            .addMatch(createMatchDto)
            .catch((error: Error) => {
                throw new BadRequestException(error.message);
            });
    }
}
