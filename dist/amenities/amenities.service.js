"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const amenities_repository_1 = require("./amenities.repository");
let AmenitiesService = class AmenitiesService {
    constructor(amenityRepository, reservationTypeRepository) {
        this.amenityRepository = amenityRepository;
        this.reservationTypeRepository = reservationTypeRepository;
    }
    async getAmenities() {
        const found = await this.amenityRepository.find();
        return found;
    }
    async addAmenity(createAmenityDto) {
        return this.amenityRepository.addAmenity(createAmenityDto, this.reservationTypeRepository);
    }
    async getAmenityById(id) {
        const found = await this.amenityRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Amenity with ID ${id} not found`);
        }
        return found;
    }
    async editAmenityById(id, createAmenityDto) {
        const { name, image } = createAmenityDto;
        let found = await this.amenityRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Amenity with ID ${id} not found`);
        }
        const updated = await this.amenityRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, image: image })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.amenityRepository.findOne({ where: { id: id } });
        return found;
    }
    async deleteAmenityById(id) {
        const found = await this.amenityRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Amenity with ID ${id} not found`);
        }
        this.amenityRepository.remove(found);
        return true;
    }
    async addAmenitiesToReservationType(addAmenitiesToReservationType) {
        const { reservationTypeId, amenitiesIds } = addAmenitiesToReservationType;
        const reservationType = await this.reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        for (let i = 0; i < amenitiesIds.length; i++) {
            let found = await this.amenityRepository.findOne({ where: { id: amenitiesIds[i] } });
            if (found) {
                if (reservationType) {
                    if (reservationType.amenities !== undefined) {
                        reservationType.amenities.push(found);
                        this.reservationTypeRepository.save(reservationType);
                    }
                    else {
                        reservationType.amenities = [];
                        reservationType.amenities.push(found);
                        this.reservationTypeRepository.save(reservationType);
                    }
                }
                else {
                    throw new common_1.NotFoundException("Reservation Type Id not found");
                }
            }
            else {
                throw new common_1.NotFoundException("Interests Id not found");
            }
        }
        return reservationType;
    }
};
AmenitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(amenities_repository_1.AmenityRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_type_repository_1.ReservationTypeRepository)),
    __metadata("design:paramtypes", [amenities_repository_1.AmenityRepository,
        reservation_type_repository_1.ReservationTypeRepository])
], AmenitiesService);
exports.AmenitiesService = AmenitiesService;
//# sourceMappingURL=amenities.service.js.map