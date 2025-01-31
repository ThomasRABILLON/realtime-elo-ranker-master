import { ELO_DRAW, ELO_LOSS, ELO_WIN } from 'src/constants';

export enum Result {
    WIN = ELO_WIN,
    LOSS = ELO_LOSS,
    DRAW = ELO_DRAW,
}
