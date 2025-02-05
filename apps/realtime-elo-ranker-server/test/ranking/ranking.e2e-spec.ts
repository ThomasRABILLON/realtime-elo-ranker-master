import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RankingController } from '../../src/ranking/ranking.controller';
import { RankingService } from '../../src/ranking/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingController (e2e)', () => {
    let app: INestApplication;
    let eventEmitter: EventEmitter2;

    beforeAll(async () => {
        const mockRankingService = {
            getRanking: jest.fn().mockResolvedValue([
                { id: 'player1', rank: 1 },
                { id: 'player2', rank: 2 },
            ]),
        };

        eventEmitter = new EventEmitter2();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [RankingController],
            providers: [
                { provide: RankingService, useValue: mockRankingService },
                { provide: EventEmitter2, useValue: eventEmitter },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('GET /api/ranking - should return player ranking', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/ranking')
            .expect(200);

        expect(response.body).toEqual([
            { id: 'player1', rank: 1 },
            { id: 'player2', rank: 2 },
        ]);
    });
});
