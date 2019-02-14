import { Category } from '../entities/category.entity';
import { GamesService } from '../services/games.service';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    list(): Promise<Category[]>;
    find(categorySlug: any): Promise<Category>;
}
