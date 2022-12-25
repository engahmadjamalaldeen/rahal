"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesModule = void 0;
const common_1 = require("@nestjs/common");
const city_repository_1 = require("../cities/city.repository");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const interest_repository_1 = require("../interests/interest.repository");
const membership_repository_1 = require("../memberships/membership.repository");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const review_repository_1 = require("../reviews/review.repository");
const place_repository_1 = require("./place.repository");
const places_controller_1 = require("./places.controller");
const places_service_1 = require("./places.service");
let PlacesModule = class PlacesModule {
};
PlacesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([place_repository_1.PlaceRepository, membership_repository_1.MembershipRepository, review_repository_1.ReviewRepository, interest_repository_1.InterestRepository, reservation_type_repository_1.ReservationTypeRepository, city_repository_1.CityRepository]),
        ],
        controllers: [places_controller_1.PlacesController],
        providers: [places_service_1.PlacesService]
    })
], PlacesModule);
exports.PlacesModule = PlacesModule;
//# sourceMappingURL=places.module.js.map