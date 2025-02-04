import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingController', () => {
    let controller: RankingController;

    beforeEach(async () => {
        const mockPlayerRepository = {
            find: jest.fn().mockResolvedValue([]),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [RankingController],
            providers: [
                RankingService,
                {
                    provide: getRepositoryToken(Player),
                    useValue: mockPlayerRepository,
                },
                {
                    provide: EventEmitter2,
                    useValue: { emit: jest.fn() },
                },
            ],
        }).compile();

        controller = module.get<RankingController>(RankingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return an array of rankings', async () => {
        expect(await controller.getRanking()).toBeInstanceOf(Array);
    });
});
