import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator } from 'typeorm';
import { Game } from '../entities/game.entity';
import { Category } from '../entities/category.entity';
import { getConnection } from "typeorm";
import { MAX_ELEMENTS_PAGE } from '../../constants';

const faker = require('faker');
@Injectable()
export class GamesService {

  constructor(
    @InjectRepository(Game)
    private readonly gameRep: Repository<Game>,
    @InjectRepository(Category)
    private readonly catRep: Repository<Category>
  ) {}

  async findGameAll(_page: number): Promise<Game[]> {
    return await this.gameRep.find({relations:["categories"], take: MAX_ELEMENTS_PAGE, skip:_page, order:{createdAt:'DESC'}});
  }

  async findCategoryAll(): Promise<Category[]>{
      return await this.catRep.find();
  }

  async findGameBySlug(_slug: string): Promise<Game>{
      return await this.gameRep.findOne({where:{slug:_slug}});
  }

  async findCategoryBySlug(_slug: string): Promise<Category>{
      return await this.catRep.findOne({where:{slug:_slug}});
  }

  async findCategoryByName(_name: string): Promise<Category>{
      return await this.catRep.findOne({where:{name:_name}});
  }

  async findGamesByCategory(_cat: Category, _page: number = 0): Promise<Game[]>{
      return await getConnection()
                    .getRepository(Game)
                    .createQueryBuilder("game")
                    .leftJoin("game.categories", "category")
                    .where("category.slug like :slug", {slug:_cat.slug})
                    .limit(MAX_ELEMENTS_PAGE)
                    .offset(_page*MAX_ELEMENTS_PAGE)
                    .getMany();
        /*
        return this.catRep.findOne({relations:["games"],where:{slug:_cat}})
                .then(e => {
                    console.log(e);
                    return e.games;
                })
        */
  }

  async addData(){
    for(let i=0; i<10; i++){

        let category = new Category();
        category.name = faker.database.type();
        category.slug = category.name;
        category.games = [];
        for(let j=0; j<50; j++){

            let game = new Game();
            game.name = faker.name.findName();
            game.slug = game.name;
            game.description = faker.lorem.paragraph();
            game.link = faker.internet.url();
            game.createdAt = faker.date.past();

            await this.gameRep.save(game);

            category.games.push(game);

        }

        await this.catRep.save(category);
    }
  }
}