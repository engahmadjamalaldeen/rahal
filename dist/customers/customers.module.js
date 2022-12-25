"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const customers_controller_1 = require("./customers.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const customer_repository_1 = require("./customer.repository");
const jwt_strategy_1 = require("./jwt.strategy");
const city_repository_1 = require("../cities/city.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const place_repository_1 = require("../places/place.repository");
const blog_repository_1 = require("../blogs/blog.repository");
const review_repository_1 = require("../reviews/review.repository");
const interest_repository_1 = require("../interests/interest.repository");
const category_repository_1 = require("../categories/category.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
let CustomersModule = class CustomersModule {
};
CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([customer_repository_1.CustomerRepository, reservation_repository_1.ReservationRepository, city_repository_1.CityRepository, place_repository_1.PlaceRepository, blog_repository_1.BlogRepository, review_repository_1.ReviewRepository, interest_repository_1.InterestRepository, category_repository_1.CategoryRepository]),
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
        providers: [customers_service_1.CustomersService, jwt_strategy_1.JwtStrategy],
        controllers: [customers_controller_1.CustomersController],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule]
    })
], CustomersModule);
exports.CustomersModule = CustomersModule;
//# sourceMappingURL=customers.module.js.map