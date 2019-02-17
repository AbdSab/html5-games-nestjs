import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus, Render } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
    
    constructor(private readonly gamesService: GamesService){}

    @Get("")
    @Render("games/index")
    async list(@Query() query){
        let games = await this.gamesService.findGameAll(query.page);
        return {games};
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

    @Post("/rate")
    async rateGame(@Body() data): Promise<Game>{
        let _rate = Number(data.rate);
        if(_rate>5 || _rate <0) throw new HttpException('Rate error', HttpStatus.BAD_REQUEST);
        return await this.gamesService.addGameRate(data.game, data.rate);
    }

    

}