import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { Category } from '../entities/category.entity';
import { getConnection } from "typeorm";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRep: Repository<Game>,
    @InjectRepository(Category)
    private readonly catRep: Repository<Category>
  ) {}

  async findGameAll(): Promise<Game[]> {
    return await this.gameRep.find();
  }

  async findCategoryAll(): Promise<Category[]>{
      return await this.catRep.find();
  }

  async findGameBySlug(_slug): Promise<Game>{
      return await this.gameRep.findOne({where:{slug:_slug}});
  }

  async findCategoryBySlug(_slug): Promise<Category>{
      return await this.catRep.findOne({where:{slug:_slug}});
  }

  async findCategoryByName(_name): Promise<Category>{
      return await this.catRep.findOne({where:{name:_name}});
  }

  async findGameByCategory(_cat): Promise<Game[]>{
      let catRes = await this.findCategoryByName(_cat);
      return await this.gameRep.find({ relations:['categories'], where:{categories.id:catRes}});
  }
}