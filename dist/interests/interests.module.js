"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsModule = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("../customers/customer.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const place_repository_1 = require("../places/place.repository");
const interest_repository_1 = require("./interest.repository");
const interests_controller_1 = require("./interests.controller");
const interests_service_1 = require("./interests.service");
let InterestsModule = class InterestsModule {
};
InterestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([interest_repository_1.InterestRepository, customer_repository_1.CustomerRepository, place_repository_1.PlaceRepository]),
        ],
        controllers: [interests_controller_1.InterestsController],
        providers: [interests_service_1.InterestsService]
    })
], InterestsModule);
exports.InterestsModule = InterestsModule;
//# sourceMappingURL=interests.module.js.map