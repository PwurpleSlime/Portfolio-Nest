import { Injectable } from '@nestjs/common';

@Injectable()
export class Connect4Service {
    public games: {id: string, gameState: number[][], playerOneTurn: boolean}[] = [];
}
