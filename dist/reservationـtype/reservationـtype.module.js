"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationTypeModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const amenities_repository_1 = require("../amenities/amenities.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const place_repository_1 = require("../places/place.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
const room_repository_1 = require("../rooms/room.repository");
const reservation_type_repository_1 = require("./reservation.type.repository");
const reservation_type_controller_1 = require("./reservation\u0640type.controller");
const reservation_type_service_1 = require("./reservation\u0640type.service");
let ReservationTypeModule = class ReservationTypeModule {
};
ReservationTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([reservation_type_repository_1.ReservationTypeRepository, place_repository_1.PlaceRepository, amenities_repository_1.AmenityRepository, reservation_repository_1.ReservationRepository, room_repository_1.RoomRepository]),
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
        controllers: [reservation_type_controller_1.ReservationTypeController],
        providers: [reservation_type_service_1.ReservationTypeService]
    })
], ReservationTypeModule);
exports.ReservationTypeModule = ReservationTypeModule;
//# sourceMappingURL=reservation%D9%80type.module.js.map