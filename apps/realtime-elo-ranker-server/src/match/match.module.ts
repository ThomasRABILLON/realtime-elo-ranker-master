import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchController } from "./match.controller";
import { MatchService } from "./match.service";
import { Match } from "./entities/match.entity";
import { PlayerModule } from "../player/player.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Match]),
        PlayerModule,
    ],
    controllers: [MatchController],
    providers: [MatchService],
})
export class MatchModule {}