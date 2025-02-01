import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Player } from '../player/entities/player.entity';

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
