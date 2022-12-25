"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const cities_controller_1 = require("./cities.controller");
const cities_service_1 = require("./cities.service");
const city_repository_1 = require("./city.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const city_image_repository_1 = require("../city_images/city.image.repository");
let CitiesModule = class CitiesModule {
};
CitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([city_repository_1.CityRepository, city_image_repository_1.CityImageRepository]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            jwt_1.JwtModule.register({
                secret: 'topSecret51',
                signOptions: {
                    expiresIn: 3600,
                }
            })
        ],
        controllers: [cities_controller_1.CitiesController],
        providers: [cities_service_1.CitiesService]
    })
], CitiesModule);
exports.CitiesModule = CitiesModule;
//# sourceMappingURL=cities.module.js.map