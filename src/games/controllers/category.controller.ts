import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { GamesService } from '../services/games.service';

@Controller('category')
export class CategoryController {
    
    constructor(private readonly gamesService: GamesService){}

    @Get("")
    async list(): Promise<Category[]>{
        return await this.gamesService.findCategoryAll();
    }

    @Get("/:categorySlug")
    async find(@Param() params, @Query() query){
        if(!query.page) query.page = 0;
        console.log(query.page);
        const category = await this.gamesService.findCategoryBySlug(params.categorySlug);
        return await this.gamesService.findGamesByCategory(category, query.page);
    }
    
}