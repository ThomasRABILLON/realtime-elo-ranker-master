import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { find } from 'rxjs';

describe('PlayerController', () => {
    let controller: PlayerController;

    beforeEach(async () => {
        const mockPlayerRepository = {
            findOneBy: jest.fn().mockImplementation(({ id }) => {
            if (id === 'test1') return { id: 'test1', rank: 0 };
            if (id === 'test2') return { id: 'test2', rank: 10 };
            return null;
            }),
            find: jest.fn().mockResolvedValue([
                {
                    id: 'test1',
                    rank: 0,
                },
                {
                    id: 'test2',
                    rank: 10,
                },
            ]),
            save: jest.fn().mockImplementation((player: Player) => {
            interface MockSaveReturn {
                then: (onFulfilled: (player: Player) => void) => {
                    catch: (onRejected: (error: any) => void) => void;
                };
            }

            const mockSaveImplementation = (player: Player): MockSaveReturn => {
                return {
                    then: (onFulfilled: (player: Player) => void) => {
                        onFulfilled(player);
                        return {
                            catch: (onRejected: (error: any) => void) => {
                                // No error, so do nothing
                            }
                        };
                    }
                };
            };

            return mockSaveImplementation(player);
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                PlayerService,
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
