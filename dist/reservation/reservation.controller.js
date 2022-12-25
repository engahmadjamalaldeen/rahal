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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const create_customer_dto_1 = require("../customers/dto/create-customer-dto");
const create_client_reservation_dto_1 = require("./dto/create-client-reservation-dto");
const create_reservation_dto_1 = require("./dto/create-reservation-dto");
const reservation_service_1 = require("./reservation.service");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    getReservation() {
        return this.reservationService.getReservations();
    }
    getReservationsByFilters(roomId, reservationTypeId, fromDate, toDate) {
        return this.reservationService.getReservationsByFilters(roomId, reservationTypeId, fromDate, toDate);
    }
    getPlaceIncome(placeId, fromDate, toDate) {
        return this.reservationService.getPlaceIncome(placeId, fromDate, toDate);
    }
    getreservationByInterests(placeId) {
        return this.reservationService.getreservationByInterests(placeId);
    }
    getreservationByCities(placeId) {
        return this.reservationService.getreservationByCities(placeId);
    }
    getreservationByReservationsTypes(placeId) {
        return this.reservationService.getreservationByReservationsTypes(placeId);
    }
    reservationByFilters(placeId, numOfKids, gender, status, numOfKidsOpe) {
        return this.reservationService.reservationByFilters(placeId, numOfKids, gender, status, numOfKidsOpe);
    }
    addReservation(createReservationDto) {
        return this.reservationService.addReservation(createReservationDto);
    }
    clientAddReservation(createClientReservationDto) {
        return this.reservationService.clientAddReservation(createClientReservationDto);
    }
    getReservationById(id) {
        return this.reservationService.getReservationById(id);
    }
    deleteReservationById(id) {
        return this.reservationService.deleteReservationById(id);
    }
    getReservationByPlaceId(placeId) {
        return this.reservationService.getReservationByPlaceId(placeId);
    }
    getReservationByCustomerId(customerId) {
        return this.reservationService.getReservationByCustomerId(customerId);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservation", null);
__decorate([
    (0, common_1.Get)('/getReservations'),
    __param(0, (0, common_1.Query)('roomId')),
    __param(1, (0, common_1.Query)('reservationTypeId')),
    __param(2, (0, common_1.Query)('fromDate')),
    __param(3, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getReservationsByFilters", null);
__decorate([
    (0, common_1.Get)('/placeIncome'),
    __param(0, (0, common_1.Query)('placeId')),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getPlaceIncome", null);
__decorate([
    (0, common_1.Get)('/reservationByInterests'),
    __param(0, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getreservationByInterests", null);
__decorate([
    (0, common_1.Get)('/getreservationByCities'),
    __param(0, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getreservationByCities", null);
__decorate([
    (0, common_1.Get)('/getreservationByReservationsTypes'),
    __param(0, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getreservationByReservationsTypes", null);
__decorate([
    (0, common_1.Get)('/reservationByFilters'),
    __param(0, (0, common_1.Query)('placeId')),
    __param(1, (0, common_1.Query)('numOfKids')),
    __param(2, (0, common_1.Query)('gender')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('numOfKidsOpe')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "reservationByFilters", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "addReservation", null);
__decorate([
    (0, common_1.Post)('/addReservation'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_reservation_dto_1.CreateClientReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "clientAddReservation", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteReservationById", null);
__decorate([
    (0, common_1.Get)('/getByPlace/:placeId'),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationByPlaceId", null);
__decorate([
    (0, common_1.Get)('/getByCustomer/:customerId'),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationByCustomerId", null);
ReservationController = __decorate([
    (0, common_1.Controller)('reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map