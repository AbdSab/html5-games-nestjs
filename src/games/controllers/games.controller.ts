import { Controller, Get, Post, Param } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
    
    constructor(private readonly gamesService: GamesService){}

    @Get("")
    async list(@Param() params): Promise<Game[]>{
        return await this.gamesService.findGameAll(params.page);
    }

    @Get("add")
    async play(){
        return await this.gamesService.addData();
    }
    
    @Get("/:gameSlug")
    async game(@Param() params): Promise<Game>{
        this.gamesService.addGamePlay(params.gameSlug);
        return await this.gamesService.findGameBySlug(params.gameSlug);
    }
    

}