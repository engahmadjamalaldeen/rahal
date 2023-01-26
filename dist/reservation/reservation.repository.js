"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const create_place_dto_1 = require("../places/dto/create-place-dto");
const create_reservation_type_dto_1 = require("../reservation\u0640type/dto/create-reservation-type-dto");
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
let ReservationRepository = class ReservationRepository extends typeorm_1.Repository {
    async addReservation(createReservationDto, placeRepository, customerRepository, roomRepository) {
        const { type, status, fromDate, toDate, customerId, placeId, roomId } = createReservationDto;
        const reservation = new reservation_entity_1.Reservation();
        const place = await placeRepository.findOne({ where: { id: placeId } });
        if (status) {
            reservation.status = status;
        }
        if (place) {
            reservation.place = place;
        }
        else {
            throw new common_1.NotFoundException("Place Id not found");
        }
        if (place.isMembership == true) {
            const customer = await customerRepository.findOne({ where: { id: customerId } });
            if (customer) {
                reservation.customer = customer;
            }
            else {
                throw new common_1.NotFoundException("Customer Id not found");
            }
            const room = await roomRepository.createQueryBuilder('Room')
                .leftJoinAndSelect('Room.reservationType', 'reservationType')
                .where("Room.id = :roomId", { roomId })
                .getOne();
            if (room) {
                if (room.reservationType.placeId == placeId) {
                    const reservations = await this.createQueryBuilder('Reservation').where({ room: room }).getMany();
                    let fromDateTime = new Date(fromDate);
                    let toDateTime = new Date(toDate);
                    for (let i = 0; i < reservations.length; i++) {
                        let reservationFromDate = new Date(reservations[i].fromDate);
                        let reservationToDate = new Date(reservations[i].toDate);
                        if ((reservationFromDate <= fromDateTime && reservationToDate >= toDateTime)
                            || (reservationFromDate >= fromDateTime && reservationFromDate <= toDateTime)
                            || (reservationToDate >= fromDateTime && reservationToDate <= toDateTime)) {
                            throw new common_1.ForbiddenException(`There is a reservation with ID ${reservations[i].id} in this dates between ${reservations[i].fromDate} and ${reservations[i].toDate}`);
                        }
                    }
                    reservation.room = room;
                }
                else {
                    throw new common_1.ForbiddenException(`Room ID ${roomId} is not for Place ID ${placeId}`);
                }
            }
            else {
                throw new common_1.NotFoundException("Room Id not found");
            }
            if (Object.values(create_place_dto_1.PlaceType).includes(type)) {
                reservation.placeType = type;
            }
            else {
                throw new common_1.ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
            }
            if (room.reservationType.priceType == create_reservation_type_dto_1.PriceType.PERNIGHT) {
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var days = (endDate.getDay() - startDate.getDay());
                reservation.price = room.reservationType.price * days;
                if (reservation.price < -1) {
                    reservation.price *= -1;
                }
            }
            else {
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var hours = (endDate.getHours() - startDate.getHours());
                reservation.price = room.reservationType.price * hours;
            }
            let parsedFromDate = new Date(fromDate);
            let parsedtoDate = new Date(toDate);
            console.log(parsedFromDate);
            reservation.fromDate = `${parsedFromDate.getFullYear()}-${parsedFromDate.getMonth() + 1 < 10 ? '0' : ''}${parsedFromDate.getMonth() + 1}-${parsedFromDate.getDate() + 1}-12`;
            reservation.toDate = `${parsedtoDate.getFullYear()}-${parsedtoDate.getMonth() + 1 < 10 ? '0' : ''}${parsedtoDate.getMonth() + 1}-${parsedtoDate.getDate()}-12`;
            await this.save(reservation);
            delete reservation.customer.accessToken;
            delete reservation.customer.password;
            delete reservation.customer.salt;
            return reservation;
        }
        else {
            throw new common_1.ForbiddenException("Place is not a membership");
        }
    }
    async changeReservationStatus(createReservationDto, id) {
        const { type, status, fromDate, toDate, customerId, placeId, roomId } = createReservationDto;
        const reservation = await this.findOne({ where: { id: id } });
        reservation.status = status;
        this.createQueryBuilder()
            .update(reservation)
            .execute();
        return reservation;
    }
    async clientAddReservation(createClientReservationDto, placeRepository, customerRepository, reservationTypeRepository) {
        const { type, fromDate, toDate, customerId, placeId, reservationTypeId } = createClientReservationDto;
        const reservation = new reservation_entity_1.Reservation();
        const place = await placeRepository.findOne({ where: { id: placeId } });
        if (place) {
            reservation.place = place;
        }
        else {
            throw new common_1.NotFoundException("Place Id not found");
        }
        if (place.isMembership == true) {
            const customer = await customerRepository.findOne({ where: { id: customerId } });
            if (customer) {
                reservation.customer = customer;
            }
            else {
                throw new common_1.NotFoundException("Customer Id not found");
            }
            const reservationType = await reservationTypeRepository.createQueryBuilder('ReservationType')
                .leftJoinAndSelect('ReservationType.rooms', 'rooms')
                .where("ReservationType.id = :reservationTypeId", { reservationTypeId })
                .getOne();
            if (!reservationType) {
                throw new common_1.NotFoundException(`Reservation Type ID: ${reservationTypeId} not found`);
            }
            if (reservationType.placeId != placeId) {
                throw new common_1.ForbiddenException(`Reservation Type ID ${reservationTypeId} is not for Place ID ${placeId}`);
            }
            let foundRoom;
            let breaked = false;
            loop1: for (let i = 0; i < reservationType.rooms.length; i++) {
                const reservations = await this.createQueryBuilder('Reservation').where({ room: reservationType.rooms[i] }).getMany();
                let fromDateTime = new Date(fromDate);
                let toDateTime = new Date(toDate);
                if (reservations.length > 0) {
                    loop2: for (let i = 0; i < reservations.length; i++) {
                        let reservationFromDate = new Date(reservations[i].fromDate);
                        let reservationToDate = new Date(reservations[i].toDate);
                        if ((reservationFromDate <= fromDateTime && reservationToDate >= toDateTime)
                            || (reservationFromDate >= fromDateTime && reservationFromDate <= toDateTime)
                            || (reservationToDate >= fromDateTime && reservationToDate <= toDateTime)) {
                            breaked = true;
                            break loop2;
                        }
                        else {
                            breaked = false;
                        }
                    }
                    if (!breaked) {
                        reservation.room = reservationType.rooms[i];
                        foundRoom = reservationType.rooms[i];
                        break loop1;
                    }
                }
                else {
                    reservation.room = reservationType.rooms[i];
                    foundRoom = reservationType.rooms[i];
                    break loop1;
                }
            }
            if (foundRoom === undefined) {
                throw new common_1.ForbiddenException(`There is no available reservation in these date`);
            }
            if (Object.values(create_place_dto_1.PlaceType).includes(type)) {
                reservation.placeType = type;
            }
            else {
                throw new common_1.ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
            }
            if (reservationType.priceType == create_reservation_type_dto_1.PriceType.PERNIGHT) {
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var days = (endDate.getDay() - startDate.getDay());
                reservation.price = reservationType.price * days;
                reservation.usdPrice = reservationType.usdPrice * days;
                if (reservation.price <= -1) {
                    reservation.price *= -1;
                }
                if (reservation.usdPrice <= -1) {
                    reservation.usdPrice *= -1;
                }
            }
            else {
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var hours = (endDate.getHours() - startDate.getHours());
                reservation.price = reservationType.price * hours;
            }
            reservation.fromDate = fromDate;
            reservation.toDate = toDate;
            await this.save(reservation);
            delete reservation.place.reservations;
            delete reservation.customer.accessToken;
            delete reservation.customer.password;
            delete reservation.customer.salt;
            return reservation;
        }
        else {
            throw new common_1.ForbiddenException("Place is not a membership");
        }
    }
};
ReservationRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(reservation_entity_1.Reservation)
], ReservationRepository);
exports.ReservationRepository = ReservationRepository;
//# sourceMappingURL=reservation.repository.js.map