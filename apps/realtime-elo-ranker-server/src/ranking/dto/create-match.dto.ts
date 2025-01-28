import { Match } from '../interfaces/match.interface';

export class CreateMatchDto implements Match {
    readonly winner: string;
    readonly loser: string;
    readonly draw: boolean;
}
