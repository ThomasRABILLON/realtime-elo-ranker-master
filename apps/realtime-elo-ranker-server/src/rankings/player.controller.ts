/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post, Body } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private service: RankingService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    this.service.addPlayer(createPlayerDto);
  }
}
