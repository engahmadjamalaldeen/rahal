"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const city_repository_1 = require("../cities/city.repository");
const customer_repository_1 = require("../customers/customer.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const place_repository_1 = require("../places/place.repository");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const room_repository_1 = require("../rooms/room.repository");
const reservation_controller_1 = require("./reservation.controller");
const reservation_repository_1 = require("./reservation.repository");
const reservation_service_1 = require("./reservation.service");
let ReservationModule = class ReservationModule {
};
ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([reservation_repository_1.ReservationRepository, place_repository_1.PlaceRepository, customer_repository_1.CustomerRepository, room_repository_1.RoomRepository, reservation_type_repository_1.ReservationTypeRepository, city_repository_1.CityRepository]),
        ],
        controllers: [reservation_controller_1.ReservationController],
        providers: [reservation_service_1.ReservationService]
    })
], ReservationModule);
exports.ReservationModule = ReservationModule;
//# sourceMappingURL=reservation.module.js.map