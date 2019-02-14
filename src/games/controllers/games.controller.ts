import { Controller, Get, Post } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
    
    constructor(private readonly gamesService: GamesService){}

    @Get("")
    async list(): Promise<Game[]>{
        return await this.gamesService.findGameByCategory("uiui");
    }

    @Get()
    play(){

    }
    

}