import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { Category } from '../entities/category.entity';
export declare class GamesService {
    private readonly gameRep;
    private readonly catRep;
    constructor(gameRep: Repository<Game>, catRep: Repository<Category>);
    findGameAll(): Promise<Game[]>;
    findCategoryAll(): Promise<Category[]>;
    findGameBySlug(_slug: any): Promise<Game>;
    findCategoryBySlug(_slug: any): Promise<Category>;
    findCategoryByName(_name: any): Promise<Category>;
    findGameByCategory(_cat: any): Promise<Game[]>;
}
