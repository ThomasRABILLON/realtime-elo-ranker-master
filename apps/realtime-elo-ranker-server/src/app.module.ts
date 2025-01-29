import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';
import { MatchController } from './ranking/match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite3',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        PlayerModule,
    ],
    controllers: [
        AppController,
        // PlayerController,
        RankingController,
        MatchController,
    ],
    providers: [AppService, RankingService],
})
export class AppModule { }
