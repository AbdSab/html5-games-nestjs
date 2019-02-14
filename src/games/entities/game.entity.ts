import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Game{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:255})
    slug: string;

    @ManyToMany(type => Category, category => category.games)
    @JoinTable()
    categories: Category[];

    @Column({length:255})
    name: string;

    @Column('text')
    description: string;

    @Column({length:500})
    link: string

    @Column('date')
    createdAt: Date;

    @Column('int')
    plays: number;

    @Column("float")
    rateTotal: number;

}