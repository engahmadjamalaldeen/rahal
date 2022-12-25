"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityImagesModule = void 0;
const common_1 = require("@nestjs/common");
const city_images_service_1 = require("./city.images.service");
const city_images_controller_1 = require("./city.images.controller");
const city_image_repository_1 = require("./city.image.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
let CityImagesModule = class CityImagesModule {
};
CityImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([city_image_repository_1.CityImageRepository]),
        ],
        providers: [city_images_service_1.CityImagesService],
        controllers: [city_images_controller_1.CityImagesController]
    })
], CityImagesModule);
exports.CityImagesModule = CityImagesModule;
//# sourceMappingURL=city.images.module.js.map