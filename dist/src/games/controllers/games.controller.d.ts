import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    list(): Promise<Game[]>;
    play(): void;
}
