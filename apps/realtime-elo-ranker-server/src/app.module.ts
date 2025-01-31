import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite3',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        PlayerModule,
        RankingModule,
        MatchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
