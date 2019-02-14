"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("../entities/game.entity");
const category_entity_1 = require("../entities/category.entity");
const typeorm_3 = require("typeorm");
const constants_1 = require("../../constants");
const faker = require('faker');
let GamesService = class GamesService {
    constructor(gameRep, catRep) {
        this.gameRep = gameRep;
        this.catRep = catRep;
    }
    findGameAll(_page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRep.find({ take: constants_1.MAX_ELEMENTS_PAGE, skip: _page, order: { createdAt: 'DESC' } });
        });
    }
    findCategoryAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.catRep.find();
        });
    }
    findGameBySlug(_slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRep.findOne({ where: { slug: _slug } });
        });
    }
    findCategoryBySlug(_slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.catRep.findOne({ relations: ["games"], where: { slug: _slug } });
        });
    }
    findCategoryByName(_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.catRep.findOne({ where: { name: _name } });
        });
    }
    findGameByCategory(_cat, _page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_3.getConnection()
                .getRepository(game_entity_1.Game)
                .createQueryBuilder("game")
                .leftJoin("game.categories", "category")
                .where("category.slug like :slug", { slug: _cat })
                .limit(constants_1.MAX_ELEMENTS_PAGE)
                .offset(_page)
                .getMany();
        });
    }
    addData() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                let category = new category_entity_1.Category();
                category.name = faker.database.type();
                category.slug = category.name;
                category.games = [];
                for (let j = 0; j < 50; j++) {
                    let game = new game_entity_1.Game();
                    game.name = faker.name.findName();
                    game.slug = game.name;
                    game.description = faker.lorem.paragraph();
                    game.link = faker.internet.url();
                    game.createdAt = faker.date.past();
                    yield this.gameRep.save(game);
                    category.games.push(game);
                }
                yield this.catRep.save(category);
            }
        });
    }
};
GamesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(game_entity_1.Game)),
    __param(1, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map