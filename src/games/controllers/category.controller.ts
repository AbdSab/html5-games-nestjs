import { Controller, Get, Param, Query, Render, HttpException, HttpStatus } from '@nestjs/common';
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
    @Render("index")
    async find(@Param() params, @Query() query){

        if(!query.page) query.page = 0;
        
        const category = await this.gamesService.findCategoryBySlug(params.categorySlug);
        if(category === undefined)
            throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
        
        const games = await this.gamesService.findGamesByCategory(category, query.page);

        return {category,games};
    }
    
}