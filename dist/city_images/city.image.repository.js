"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityImageRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const city_image_entity_1 = require("./city_image.entity");
let CityImageRepository = class CityImageRepository extends typeorm_1.Repository {
    async addCityImage(urls, cityId) {
        let cityImages = [];
        for (let i = 0; i < urls.length; i++) {
            const cityImage = new city_image_entity_1.CityImage();
            cityImage.url = urls[i];
            cityImage.cityId = cityId;
            await this.save(cityImage);
            cityImages.push(cityImage);
        }
        return cityImages;
    }
};
CityImageRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(city_image_entity_1.CityImage)
], CityImageRepository);
exports.CityImageRepository = CityImageRepository;
//# sourceMappingURL=city.image.repository.js.map