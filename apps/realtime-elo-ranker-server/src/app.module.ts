import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';
import { PlayerController } from './ranking/player.controller';

@Module({
  imports: [],
  controllers: [AppController, PlayerController, RankingController],
  providers: [AppService, RankingService],
})
export class AppModule {}
