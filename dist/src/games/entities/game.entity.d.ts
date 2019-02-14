import { Category } from './category.entity';
export declare class Game {
    id: number;
    slug: string;
    categories: Category[];
    name: string;
    description: string;
    link: string;
}
