import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus, Render } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesService } from '../services/games.service';
import { headData, breadcrumbData } from '../../other/helper';

@Controller('games')
export class GamesController {
    
    constructor(private readonly gamesService: GamesService){}

    @Get("")
    @Render("pages/games/index")
    async list(@Query() query){
        
        const games = await this.gamesService.findGameAll(query.page);
        const head  = headData("Free Games", "Play free games for all ages now", games[0].image);
        const breadcrumb = breadcrumbData([["/","Home"]]);

        return {head, breadcrumb, games};
    }

    @Get("add")
    async play(){
        return await this.gamesService.addData();
    }

    @Get("/:gameSlug")
    @Render("pages/games/play")
    async game(@Param() params){
        this.gamesService.addGamePlay(params.gameSlug);
        
        const game = await this.gamesService.findGameBySlug(params.gameSlug);
        const head = headData(game.name, game.description, game.image);
        const breadcrumb = breadcrumbData([["/","Home"], ["/games/"+game.name, game.name]]);
        return {head,breadcrumb, game}
    }

    @Post("/:gameSlug/rate")
    async rateGame(@Param() params,@Body() data): Promise<Game>{
        let _rate = Number(data.rate);
        if(_rate>5 || _rate <0) throw new HttpException('Rate error', HttpStatus.BAD_REQUEST);
        return await this.gamesService.addGameRate(params.gameSlug, _rate);
    }

    

}