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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const place_repository_1 = require("../places/place.repository");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const room_repository_1 = require("./room.repository");
let RoomsService = class RoomsService {
    constructor(roomRepository, reservationTypeRepository, placeRepository) {
        this.roomRepository = roomRepository;
        this.reservationTypeRepository = reservationTypeRepository;
        this.placeRepository = placeRepository;
    }
    async getRooms(name) {
        if (name === undefined) {
            console.log("outo " + name);
            const found = await this.roomRepository.createQueryBuilder('Room')
                .leftJoinAndSelect('Room.reservationType', 'reservationType')
                .leftJoinAndSelect('Room.reservations', 'reservations')
                .getMany();
            return found;
        }
        else {
            console.log("ino " + name);
            const found = await this.roomRepository.createQueryBuilder('Room')
                .leftJoinAndSelect('Room.reservationType', 'reservationType')
                .leftJoinAndSelect('Room.reservations', 'reservations')
                .where("Room.name = :name", { name: name })
                .getMany();
            return found;
        }
    }
    async addRoom(createRoomDto) {
        return this.roomRepository.addRoom(createRoomDto, this.reservationTypeRepository);
    }
    async getRoomById(id) {
        const found = await this.roomRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found`);
        }
        return found;
    }
    async editRoomById(id, createRoomDto) {
        const { name, reservationTypeId } = createRoomDto;
        let found = await this.roomRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found`);
        }
        const reservationType = await this.reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        if (!reservationType) {
            throw new common_1.NotFoundException(`Reservation Type with ID ${id} not found`);
        }
        if (found.reservationType.placeId !== reservationType.placeId) {
            throw new common_1.ForbiddenException(`Reservation Type ID ${reservationTypeId} is not for the same reservation type ID : ${found.reservationType.id}`);
        }
        const updated = await this.roomRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, reservationType: reservationType })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.roomRepository.findOne({ where: { id: id } });
        return found;
    }
    async deleteRoomById(id) {
        let found = await this.roomRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found`);
        }
        let deleted;
        try {
            deleted = await this.roomRepository.createQueryBuilder()
                .delete()
                .where("id = :id", { id: found.id })
                .execute();
        }
        catch (e) {
            throw new common_1.ForbiddenException(`Room ID: ${id} has reservations`);
        }
        return deleted ? true : false;
    }
    async getRoomsByReservationTypeId(reservationTypeId) {
        const reservationType = await this.reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        if (!reservationType)
            throw new common_1.NotFoundException(`Reservation type id ${reservationTypeId} not found`);
        const found = await this.roomRepository.createQueryBuilder('Room')
            .where("Room.reservationType.id = :reservationTypeId", { reservationTypeId })
            .getMany();
        return found;
    }
    async getRoomsByPlaceId(placeId) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place)
            throw new common_1.NotFoundException(`Place id: ${placeId} not found`);
        const reservationType = await this.reservationTypeRepository.find({ where: { placeId: placeId } });
        if (!reservationType)
            throw new common_1.NotFoundException(`There is no rooms for place id: ${placeId}`);
        let found = [];
        for (let i = 0; i < reservationType.length; i++) {
            let reservationTypeId = reservationType[i].id;
            found = [...found, ...await this.roomRepository.createQueryBuilder('Room')
                    .leftJoinAndSelect("Room.reservationType", "reservationType")
                    .where("Room.reservationType.id = :reservationTypeId", { reservationTypeId })
                    .getMany()];
        }
        return found;
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_type_repository_1.ReservationTypeRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __metadata("design:paramtypes", [room_repository_1.RoomRepository,
        reservation_type_repository_1.ReservationTypeRepository,
        place_repository_1.PlaceRepository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map