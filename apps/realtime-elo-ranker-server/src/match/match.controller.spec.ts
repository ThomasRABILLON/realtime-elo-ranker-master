import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MatchController', () => {
    let controller: MatchController;

    beforeEach(async () => {
        const mockMatchRepository = {
            find: jest.fn().mockResolvedValue([
                {
                    id: 1,
                    winner: { id: 'test1', rank: 0 },
                    loser: { id: 'test2', rank: 10 },
                    draw: false,
                },
                {
                    id: 2,
                    winner: { id: 'test2', rank: 10 },
                    loser: { id: 'test1', rank: 0 },
                    draw: false,
                },
            ]),
            save: jest.fn().mockImplementation((match: Match) => match),
        };

        const mockPlayerRepository = {
            findOneBy: jest.fn().mockImplementation(({ id }) => {
            if (id === 'test1') return { id: 'test1', rank: 0 };
            if (id === 'test2') return { id: 'test2', rank: 10 };
            return null;
            }),
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
            controllers: [MatchController],
            providers: [
                MatchService,
                {
                    provide: getRepositoryToken(Match),
                    useValue: mockMatchRepository,
                },
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

        controller = module.get<MatchController>(MatchController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return the match newly created', async () => {
        const match = new Match();
        match.id = 3;
        match.winner = 'test1';
        match.loser = 'test2';
        match.draw = false;

        expect((await controller.create(match)).id).toEqual(match.id);
    });
});
