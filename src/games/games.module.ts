import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';
import { CategoryController } from './controllers/category.controller';
import { Game } from './entities/game.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Category])],
  providers: [GamesService],
  controllers: [GamesController, CategoryController],
})
export class GamesModule {}