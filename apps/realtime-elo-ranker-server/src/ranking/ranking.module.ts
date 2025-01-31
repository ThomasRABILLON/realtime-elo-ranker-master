import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankingController } from "./ranking.controller";
import { RankingService } from "./ranking.service";
import { PlayerModule } from "src/player/player.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        PlayerModule,
    ],
    controllers: [RankingController],
    providers: [RankingService],
})
export class RankingModule {}