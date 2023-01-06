"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("./city.entity");
let CityRepository = class CityRepository extends typeorm_1.Repository {
    async addCity(createCityDto) {
        const { name, description, nameAR, descriptionAR } = createCityDto;
        const city = new city_entity_1.City();
        city.name = name;
        city.description = description;
        city.nameAR = nameAR;
        city.nameAR = descriptionAR;
        await this.save(city);
        let fullCity = await this.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images')
            .where("City.id = :id", { id: city.id })
            .getOne();
        return fullCity;
    }
};
CityRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(city_entity_1.City)
], CityRepository);
exports.CityRepository = CityRepository;
//# sourceMappingURL=city.repository.js.map