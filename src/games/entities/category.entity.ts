import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./game.entity";
import { GamesController } from "../controllers/games.controller";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:255})
    slug: string;

    @Column({length:255})
    name: string;

    @ManyToMany(type => Game, game => game.categories)
    games: Game[];

}