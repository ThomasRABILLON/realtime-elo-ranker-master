import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from '../../src/match/match.controller';
import { MatchService } from '../../src/match/match.service';
import { Match } from '../../src/match/entities/match.entity';
import { CreateMatchDto } from '../../src/match/dto/create-match.dto';

describe('MatchController (e2e)', () => {
    let app: INestApplication;
    let matchService: MatchService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite', // Utilisation de SQLite en mémoire
                    database: ':memory:',
                    entities: [Match],
                    synchronize: true, // Synchronisation automatique des entités
                }),
                TypeOrmModule.forFeature([Match]),
            ],
            controllers: [MatchController],
            providers: [
                {
                    provide: MatchService,
                    useValue: {
                        addMatch: jest.fn().mockImplementation((matchDto: CreateMatchDto) => {
                            if (!matchDto.winner || !matchDto.loser) {
                                throw new BadRequestException('Invalid request');
                            }
                            return Promise.resolve({
                                ...matchDto,
                                id: 'match123',
                                date: new Date(),
                            });
                        }),
                    },
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        matchService = moduleFixture.get<MatchService>(MatchService);
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /api/match - should create a match', async () => {
        const matchDto: CreateMatchDto = {
            id: 1,
            winner: 'player1',
            loser: 'player2',
            draw: false,
        };

        const response = await request(app.getHttpServer())
            .post('/api/match')
            .send(matchDto)
            .expect(201); // Vérifie que l'API renvoie 201 (Created)

        expect(response.body).toHaveProperty('id', 'match123');
        expect(response.body).toHaveProperty('winner', matchDto.winner);
        expect(response.body).toHaveProperty('loser', matchDto.loser);
    });

    it('POST /api/match - should fail when request is invalid', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/match')
            .send({})
            .expect(400); // Vérifie que l'API renvoie 400 (Bad Request)

        expect(response.body.message).toBe('Invalid request');
    });
});
