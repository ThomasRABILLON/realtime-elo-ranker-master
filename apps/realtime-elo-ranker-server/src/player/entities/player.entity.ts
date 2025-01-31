import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
    @PrimaryColumn()
    id: string;

    @Column({ default: 0 })
    rank: number;
}