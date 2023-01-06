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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_repository_1 = require("../cities/city.repository");
const customer_repository_1 = require("../customers/customer.repository");
const place_repository_1 = require("../places/place.repository");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const room_repository_1 = require("../rooms/room.repository");
const create_client_reservation_dto_1 = require("./dto/create-client-reservation-dto");
const reservation_repository_1 = require("./reservation.repository");
let ReservationService = class ReservationService {
    constructor(reservationRepository, placeRepository, customerRepository, roomRepository, reservationTypeRepository, cityRepository) {
        this.reservationRepository = reservationRepository;
        this.placeRepository = placeRepository;
        this.customerRepository = customerRepository;
        this.roomRepository = roomRepository;
        this.reservationTypeRepository = reservationTypeRepository;
        this.cityRepository = cityRepository;
    }
    async getReservations() {
        const found = await this.reservationRepository.find({ relations: ['room', 'place', 'customer'] });
        for (let i = 0; i < found.length; i++) {
            delete found[i].customer.salt;
            delete found[i].customer.password;
            delete found[i].customer.accessToken;
            delete found[i].place.reservations;
        }
        return found;
    }
    async getReservationsByFilters(roomId, reservationTypeId, fromDate, toDate) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        let reservationsBasedOnRoom = await this.reservationRepository.createQueryBuilder('Reservation').where({ room: room }).getMany();
        let reservations = [];
        let fromDateTime = new Date(fromDate);
        let toDateTime = new Date(toDate);
        for (let i = 0; i < reservationsBasedOnRoom.length; i++) {
            let reservationFromDate = new Date(reservationsBasedOnRoom[i].fromDate);
            let reservationToDate = new Date(reservationsBasedOnRoom[i].toDate);
            if ((fromDateTime <= reservationFromDate && toDateTime >= reservationToDate
                || (toDateTime >= reservationFromDate && fromDateTime <= reservationFromDate))
                || (fromDateTime <= reservationToDate && toDateTime >= reservationToDate)) {
                reservations.push(reservationsBasedOnRoom[i]);
            }
        }
        const reservationTyp = await this.reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        const placeId = reservationTyp.placeId;
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        let reservationsBasedOnReservationTyp = await this.reservationRepository
            .createQueryBuilder('Reservation')
            .where({ place: place })
            .getMany();
        let reservations1 = [];
        let fromDateTime1 = new Date(fromDate);
        let toDateTime1 = new Date(toDate);
        for (let i = 0; i < reservationsBasedOnReservationTyp.length; i++) {
            let reservationFromDate = new Date(reservationsBasedOnReservationTyp[i].fromDate);
            let reservationToDate = new Date(reservationsBasedOnReservationTyp[i].toDate);
            if ((fromDateTime1 <= reservationFromDate && toDateTime1 >= reservationToDate
                || (toDateTime1 >= reservationFromDate && fromDateTime1 <= reservationFromDate))
                || (fromDateTime1 <= reservationToDate && toDateTime1 >= reservationToDate)) {
                reservations1.push(reservationsBasedOnReservationTyp[i]);
            }
        }
        if (!roomId) {
            var map1 = {
                'reservationsBasedOnReservationTyp': reservations1
            };
            return map1;
        }
        if (!reservationTypeId) {
            var map2 = {
                'reservationsBasedOnRoom': reservations
            };
            return map2;
        }
        if (!room && !reservationTyp) {
            throw new common_1.NotFoundException(`room or reservationTyp not found`);
        }
    }
    async addReservation(createReservationDto) {
        return this.reservationRepository.addReservation(createReservationDto, this.placeRepository, this.customerRepository, this.roomRepository);
    }
    async changeReservationStatus(createReservationDto, id) {
        return this.reservationRepository.changeReservationStatus(createReservationDto, id);
    }
    async clientAddReservation(createClientReservationDto) {
        return this.reservationRepository.clientAddReservation(createClientReservationDto, this.placeRepository, this.customerRepository, this.reservationTypeRepository);
    }
    async getReservationById(id) {
        const found = await this.reservationRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
        return found;
    }
    async deleteReservationById(id) {
        const found = await this.reservationRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
        this.reservationRepository.remove(found);
        return true;
    }
    async getReservationByPlaceId(placeId) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        else {
            const found = await this.reservationRepository.createQueryBuilder('Reservation').where({ place: place })
                .leftJoinAndSelect('Reservation.place', 'place')
                .leftJoinAndSelect('Reservation.customer', 'customer')
                .leftJoinAndSelect('Reservation.room', 'room')
                .leftJoinAndSelect('customer.interests', 'interests')
                .getMany();
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            for (let i = 0; i < found.length; i++) {
                delete found[i].customer.accessToken;
                delete found[i].customer.password;
                delete found[i].customer.salt;
            }
            return found;
        }
    }
    async getReservationByCustomerId(customerId) {
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer ID: ${customerId} not found`);
        }
        else {
            const found = await this.reservationRepository.createQueryBuilder('Reservation').where({ customer: customer }).leftJoinAndSelect('Reservation.place', 'place').leftJoinAndSelect('Reservation.customer', 'customer').getMany();
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${customerId}`);
            }
            for (let i = 0; i < found.length; i++) {
                delete found[i].customer.accessToken;
                delete found[i].customer.password;
                delete found[i].customer.salt;
            }
            return found;
        }
    }
    async getPlaceIncome(placeId, fromDate, toDate) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        let fromDateTime = new Date(fromDate);
        let toDateTime = new Date(toDate);
        const daysDiff = Math.floor(Math.abs(fromDateTime - toDateTime) / (1000 * 60 * 60 * 24));
        let incomes = [];
        let remainings = new Map();
        for (let i = 0; i <= daysDiff; i++) {
            let total = 0;
            let date = `${fromDateTime.getFullYear()}-${fromDateTime.getMonth() + 1 < 10 ? '0' : ''}${fromDateTime.getMonth() + 1}-${fromDateTime.getDate()}`;
            let reservationsInDay = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoinAndSelect('Reservation.place', 'place')
                .leftJoinAndSelect('Reservation.room', 'room')
                .leftJoinAndSelect('room.reservationType', 'reservationType')
                .where("Reservation.placeId = :placeId", { placeId: placeId })
                .where({ fromDate: date })
                .getMany();
            for (let i = 0; i < reservationsInDay.length; i++) {
                if (remainings.has(reservationsInDay[i].fromDate)) {
                    total += (reservationsInDay[i].price / reservationsInDay[i].numOfDays)
                        + remainings.get(reservationsInDay[i].fromDate);
                    remainings.delete(reservationsInDay[i].fromDate);
                }
                else {
                    total += reservationsInDay[i].price / reservationsInDay[i].numOfDays;
                }
            }
            for (let i = 0; i < reservationsInDay.length; i++) {
                for (let j = 1; j <= reservationsInDay[i].numOfDays - 1; j++) {
                    let date = new Date(reservationsInDay[i].fromDate);
                    let nextDate = this.addDays(date, j);
                    if (remainings.has(this.formatDateToString(nextDate))) {
                        let old = remainings.get(this.formatDateToString(nextDate));
                        old += reservationsInDay[i].price / reservationsInDay[i].numOfDays;
                        remainings.set(this.formatDateToString(nextDate), old);
                    }
                    else {
                        remainings.set(this.formatDateToString(nextDate), reservationsInDay[i].price / reservationsInDay[i].numOfDays);
                    }
                }
            }
            incomes = incomes.concat({ "day": date, "total": total });
            fromDateTime.setDate(fromDateTime.getDate() + 1);
        }
        remainings.forEach((value, key) => {
            for (let i = 0; i < incomes.length; i++) {
                if (incomes[i]['day'] == key) {
                    incomes[i]['total'] += value;
                }
            }
        });
        return incomes;
    }
    async getreservationByInterests(placeId) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        else {
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({ place: place })
                .select("interests.name", "interestName")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.customer', 'customer')
                .leftJoin('customer.interests', 'interests')
                .groupBy("interests.id")
                .getRawMany();
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            let total = 0;
            for (let index = 0; index < found.length; index++) {
                total += +found[index].total;
            }
            var map1 = {
                'total': total,
                'sub': found
            };
            return map1;
        }
    }
    async getreservationByCities(placeId) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        else {
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({ place: place })
                .select("city.name", "cityName")
                .addSelect("city.id", "cityId")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.customer', 'customer')
                .leftJoin('customer.cityId', 'city')
                .groupBy("city.id")
                .getRawMany();
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            return found;
        }
    }
    async getreservationByReservationsTypes(placeId) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        else {
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({ place: place })
                .select("reservationType.name", "reservationTypeName")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.room', 'room')
                .leftJoin('room.reservationType', 'reservationType')
                .groupBy("reservationType.name")
                .getRawMany();
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            return found;
        }
    }
    async reservationByFilters(placeId, numOfKids, gender, status, numOfKidsOpe) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new common_1.NotFoundException(`Place ID: ${placeId} not found`);
        }
        else {
            let found;
            if (gender == undefined && status == undefined && numOfKids == undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoinAndSelect('Reservation.place', 'place')
                    .select("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .getRawOne();
            }
            else if (gender != undefined && status == undefined && numOfKids == undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.gender", "gender")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(gender ? "customer.gender = :gender" : "1=1", { gender: gender })
                    .addGroupBy("customer.gender")
                    .getRawMany();
            }
            else if (gender == undefined && status != undefined && numOfKids == undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.status", "status")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(status ? "customer.status = :status" : "1=1", { status: status })
                    .addGroupBy("customer.status")
                    .getRawMany();
            }
            else if (gender == undefined && status == undefined && numOfKids != undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.numOfKids", "numOfKids")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where(this.getOperation(numOfKidsOpe), { numOfKids: numOfKids })
                    .addGroupBy("customer.numOfKids")
                    .getRawMany();
            }
            else if (gender != undefined && status != undefined && numOfKids == undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.status", "status")
                    .addSelect("customer.gender", "gender")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(status ? "customer.status = :status" : "1=1", { status: status })
                    .andWhere(gender ? "customer.gender = :gender" : "1=1", { gender: gender })
                    .groupBy("customer.gender")
                    .addGroupBy("customer.status")
                    .getRawMany();
            }
            else if (gender != undefined && status == undefined && numOfKids != undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.gender", "gender")
                    .addSelect("customer.numOfKids", "numOfKids")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(gender ? "customer.gender = :gender" : "1=1", { gender: gender })
                    .andWhere(this.getOperation(numOfKidsOpe), { numOfKids: numOfKids })
                    .groupBy("customer.gender")
                    .addGroupBy("customer.numOfKids")
                    .getRawMany();
            }
            else if (gender == undefined && status != undefined && numOfKids != undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.status", "status")
                    .addSelect("customer.numOfKids", "numOfKids")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(status ? "customer.status = :status" : "1=1", { status: status })
                    .andWhere(this.getOperation(numOfKidsOpe), { numOfKids: numOfKids })
                    .groupBy("customer.status")
                    .addGroupBy("customer.numOfKids")
                    .getRawMany();
            }
            else if (gender != undefined && status != undefined && numOfKids != undefined) {
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                    .leftJoin('Reservation.customer', 'customer')
                    .select("customer.status", "status")
                    .addSelect("customer.gender", "gender")
                    .addSelect("customer.numOfKids", "numOfKids")
                    .addSelect("SUM(Reservation.price)", "total")
                    .where("Reservation.placeId = :placeId", { placeId: placeId })
                    .andWhere(status ? "customer.status = :status" : "1=1", { status: status })
                    .andWhere(gender ? "customer.gender = :gender" : "1=1", { gender: gender })
                    .andWhere(this.getOperation(numOfKidsOpe), { numOfKids: numOfKids })
                    .groupBy("customer.gender")
                    .addGroupBy("customer.status")
                    .addGroupBy("customer.numOfKids")
                    .getRawMany();
            }
            if (!found) {
                throw new common_1.NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            return found;
        }
    }
    addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }
    formatDateToString(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`;
    }
    getOperation(numOfKidsOpe) {
        try {
            if (!Object.values(create_client_reservation_dto_1.Operation).includes(numOfKidsOpe)) {
                throw new common_1.ForbiddenException(`operation must be {BIGGER, BIGGER_OR_EQUALS, EQUALS, SMALLER_OR_EQUALS, SMALLER}`);
            }
            if (numOfKidsOpe == create_client_reservation_dto_1.Operation.BIGGER)
                return "customer.numOfKids > :numOfKids";
            else if (numOfKidsOpe == create_client_reservation_dto_1.Operation.BIGGER_OR_EQUALS)
                return "customer.numOfKids >= :numOfKids";
            else if (numOfKidsOpe == create_client_reservation_dto_1.Operation.EQUALS)
                return "customer.numOfKids = :numOfKids";
            else if (numOfKidsOpe == create_client_reservation_dto_1.Operation.SMALLER_OR_EQUALS)
                return "customer.numOfKids <= :numOfKids";
            else if (numOfKidsOpe == create_client_reservation_dto_1.Operation.SMALLER)
                return "customer.numOfKids > :numOfKids";
        }
        catch (e) {
            throw new common_1.ForbiddenException(`operation must be {BIGGER, BIGGER_OR_EQUALS, EQUALS, SMALLER_OR_EQUALS, SMALLER}`);
        }
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_repository_1.ReservationRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_repository_1.CustomerRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(room_repository_1.RoomRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(reservation_type_repository_1.ReservationTypeRepository)),
    __param(5, (0, typeorm_1.InjectRepository)(city_repository_1.CityRepository)),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository,
        place_repository_1.PlaceRepository,
        customer_repository_1.CustomerRepository,
        room_repository_1.RoomRepository,
        reservation_type_repository_1.ReservationTypeRepository,
        city_repository_1.CityRepository])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map