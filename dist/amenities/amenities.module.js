"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const amenities_controller_1 = require("./amenities.controller");
const amenities_repository_1 = require("./amenities.repository");
const amenities_service_1 = require("./amenities.service");
let AmenitiesModule = class AmenitiesModule {
};
AmenitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([amenities_repository_1.AmenityRepository, reservation_type_repository_1.ReservationTypeRepository]),
        ],
        controllers: [amenities_controller_1.AmenitiesController],
        providers: [amenities_service_1.AmenitiesService]
    })
], AmenitiesModule);
exports.AmenitiesModule = AmenitiesModule;
//# sourceMappingURL=amenities.module.js.map