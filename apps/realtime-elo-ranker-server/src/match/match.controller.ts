import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    async create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchService.addMatch(createMatchDto);
    }
}
