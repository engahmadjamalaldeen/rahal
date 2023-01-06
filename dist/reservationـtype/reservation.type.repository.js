"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const create_reservation_type_dto_1 = require("./dto/create-reservation-type-dto");
const reservation_type_entity_1 = require("./reservation\u0640type.entity");
let ReservationTypeRepository = class ReservationTypeRepository extends typeorm_1.Repository {
    async addReservationType(createReservationTypeDto, placeRepository, amenityRepository) {
        const { name, nameAR, usdPrice, description, descriptionAR, price, priceType, placeId, amenityIds } = createReservationTypeDto;
        const reservationType = new reservation_type_entity_1.ReservationType();
        reservationType.name = name;
        reservationType.usdPrice = usdPrice;
        reservationType.description = description;
        reservationType.price = price;
        const place = await placeRepository.findOne({ where: { id: placeId } });
        if (place) {
            reservationType.placeId = placeId;
        }
        else {
            throw new common_1.NotFoundException("Place Id not found");
        }
        if (Object.values(create_reservation_type_dto_1.PriceType).includes(priceType)) {
            reservationType.priceType = priceType;
        }
        else {
            throw new common_1.ForbiddenException('Price type should be {PERNIGHT, PERHOUR}');
        }
        reservationType.amenities = [];
        if (amenityIds !== undefined) {
            for (let i = 0; i < amenityIds.length; i++) {
                let amenity = await amenityRepository.findOne({ where: { id: amenityIds[i] } });
                if (amenity) {
                    reservationType.amenities.push(amenity);
                }
                else {
                    throw new common_1.NotFoundException(`Amenity Id: ${amenity.id} not found`);
                }
            }
        }
        await this.save(reservationType);
        return reservationType;
    }
};
ReservationTypeRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(reservation_type_entity_1.ReservationType)
], ReservationTypeRepository);
exports.ReservationTypeRepository = ReservationTypeRepository;
//# sourceMappingURL=reservation.type.repository.js.map