import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';

describe('PlayerController', () => {
    let controller: PlayerController;

    beforeEach(async () => {
        const mockPlayerRepository = {
            find: jest.fn().mockResolvedValue([
                { id: 'test1', rank: 0 },
                { id: 'test2', rank: 10 },
            ]),
            save: jest.fn().mockImplementation((player: Player) => player),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(Player),
                    useValue: mockPlayerRepository,
                },
            ],
        }).compile();

        controller = module.get<PlayerController>(PlayerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return the player newly created', async () => {
        const player = new Player();
        player.id = 'test';

        expect((await controller.addPlayer(player)).id).toEqual(player.id);
    });

    it('should return set the rank of the player to 5 (mean between 0 and 10)', async () => {
        const player = new Player();
        player.id = 'test';

        expect((await controller.addPlayer(player)).rank).toEqual(5);
    });
});
