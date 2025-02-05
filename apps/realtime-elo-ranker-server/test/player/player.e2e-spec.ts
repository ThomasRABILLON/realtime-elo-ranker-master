import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from '../../src/player/player.controller';
import { PlayerService } from '../../src/player/player.service';
import { Player } from '../../src/player/entities/player.entity';
import { CreatePlayerDto } from '../../src/player/dto/create-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('PlayerController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite', // Utilisation de SQLite en mémoire pour les tests
                    database: ':memory:',
                    entities: [Player],
                    synchronize: true, // Synchronisation automatique des entités
                }),
                TypeOrmModule.forFeature([Player]), // Déclare l'entité pour le repo
            ],
            controllers: [PlayerController],
            providers: [PlayerService, EventEmitter2],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /api/player - should create a player', async () => {
        const playerDto: CreatePlayerDto = {
            id: 'test-player',
            rank: 0, // Add a default rank value
        };

        const response = await request(app.getHttpServer())
            .post('/api/player')
            .send({
                id: playerDto.id,
            })
            .expect(201); // Vérifie que la requête renvoie un statut HTTP 201

        expect(response.body).toHaveProperty('id', playerDto.id);
        expect(response.body).toHaveProperty('rank'); // Vérifie que le rank est bien généré
    });

    it('POST /api/player - should fail when body is invalid', async () => {
        await request(app.getHttpServer())
            .post('/api/player')
            .send({})
            .expect(400); // Vérifie que l'API renvoie une erreur 400 pour une requête invalide
    });
});
