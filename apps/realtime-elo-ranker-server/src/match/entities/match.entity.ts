import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    winner: string;

    @Column()
    loser: string;

    @Column()
    draw: boolean;
}