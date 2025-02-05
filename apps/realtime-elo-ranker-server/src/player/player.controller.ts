import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
    constructor(private playerService: PlayerService) {}

    @Post()
    async addPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        try {
            return await this.playerService.addPlayer(createPlayerDto);
        } catch (error) {
            throw new BadRequestException('Invalid request');
        }
    }
}
