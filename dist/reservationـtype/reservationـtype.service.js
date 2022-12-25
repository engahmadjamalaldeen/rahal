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
exports.ReservationTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const amenities_repository_1 = require("../amenities/amenities.repository");
const place_repository_1 = require("../places/place.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
const room_repository_1 = require("../rooms/room.repository");
const reservation_type_repository_1 = require("./reservation.type.repository");
let ReservationTypeService = class ReservationTypeService {
    constructor(reservationTypeRepository, PlaceRepository, amenityRepository, reservationRepository, roomRepository) {
        this.reservationTypeRepository = reservationTypeRepository;
        this.PlaceRepository = PlaceRepository;
        this.amenityRepository = amenityRepository;
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
    }
    async getReservationTypes() {
        const found = await this.reservationTypeRepository.createQueryBuilder('ReservationType')
            .leftJoinAndSelect('ReservationType.amenities', 'amenities')
            .leftJoinAndSelect('ReservationType.rooms', 'rooms')
            .getMany();
        return found;
    }
    async addReservationType(createReservationTypeDto) {
        return this.reservationTypeRepository.addReservationType(createReservationTypeDto, this.PlaceRepository, this.amenityRepository);
    }
    async getReservationTypeById(id) {
        const found = await this.reservationTypeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
        return found;
    }
    async editReservationTypeById(id, createReservationTypeDto) {
        const { name, description, price, priceType, placeId, amenityIds } = createReservationTypeDto;
        let found = await this.reservationTypeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
        found.amenities = [];
        if (amenityIds !== undefined) {
            for (let i = 0; i < amenityIds.length; i++) {
                let amenity = await this.amenityRepository.findOne({ where: { id: amenityIds[i] } });
                if (amenity) {
                    found.amenities.push(amenity);
                }
                else {
                    throw new common_1.NotFoundException(`Amenity Id: ${amenityIds[i]} not found`);
                }
            }
        }
        await this.reservationTypeRepository.save(found);
        const updated = await this.reservationTypeRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, description: description, price: price, priceType: priceType })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.reservationTypeRepository.findOne({ where: { id: id }, relations: ['rooms', 'amenities'] });
        return found;
    }
    async deleteReservationTypeById(id) {
        const found = await this.reservationTypeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`ReservationType with ID ${id} not found`);
        }
        const reservationTypeId = found.id;
        const rooms = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect("Room.reservations", "reservations")
            .where("Room.reservationType.id = :reservationTypeId", { reservationTypeId })
            .getMany();
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].reservations.length > 0) {
                throw new common_1.ForbiddenException(`This reservation type have reservations on Room ID: ${rooms[i].id}`);
            }
        }
        let deleted;
        try {
            deleted = await this.reservationTypeRepository.createQueryBuilder()
                .delete()
                .where("id = :id", { id: found.id })
                .execute();
        }
        catch (e) {
            throw new common_1.ForbiddenException(`Reservation Type ID: ${id} has reservations`);
        }
        return deleted ? true : false;
    }
    async getReservationTypesByPlaceId(placeId) {
        const found = await this.reservationTypeRepository.find({ where: { placeId: placeId } });
        if (!found) {
            throw new common_1.NotFoundException(`No Reservations Types found for place ID: ${placeId}`);
        }
        return found;
    }
    async getReservationTypeReservations(id) {
        const found = await this.reservationTypeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Reservation Type not found');
        }
        const reservationTypeId = found.id;
        const rooms = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect("Room.reservations", "reservations")
            .where("Room.reservationType.id = :reservationTypeId", { reservationTypeId })
            .getMany();
        let reservations = [];
        for (let i = 0; i < rooms.length; i++) {
            reservations = reservations.concat(rooms[i].reservations);
        }
        return reservations;
    }
};
ReservationTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_type_repository_1.ReservationTypeRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(amenities_repository_1.AmenityRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(reservation_repository_1.ReservationRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __metadata("design:paramtypes", [reservation_type_repository_1.ReservationTypeRepository,
        place_repository_1.PlaceRepository,
        amenities_repository_1.AmenityRepository,
        reservation_repository_1.ReservationRepository,
        room_repository_1.RoomRepository])
], ReservationTypeService);
exports.ReservationTypeService = ReservationTypeService;
//# sourceMappingURL=reservation%D9%80type.service.js.map