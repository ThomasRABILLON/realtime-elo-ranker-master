import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
    constructor(private playerService: PlayerService) {}

    @Post()
    addPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return this.playerService
            .addPlayer(createPlayerDto)
            .catch((error: Error) => {
                throw new BadRequestException(error.message);
            });
    }
}
