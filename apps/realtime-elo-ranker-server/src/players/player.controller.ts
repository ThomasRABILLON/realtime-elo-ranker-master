/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    this.playerService.create(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }
}
