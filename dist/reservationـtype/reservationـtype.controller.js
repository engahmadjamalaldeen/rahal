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
exports.ReservationTypeController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../helpers/roles.guard");
const create_membership_user_dto_1 = require("../membership-user/dto/create-membership-user-dto");
const create_reservation_type_dto_1 = require("./dto/create-reservation-type-dto");
const reservation_type_service_1 = require("./reservation\u0640type.service");
let ReservationTypeController = class ReservationTypeController {
    constructor(reservationTypeService) {
        this.reservationTypeService = reservationTypeService;
    }
    getReservation() {
        return this.reservationTypeService.getReservationTypes();
    }
    addReservation(createReservationTypeDto) {
        return this.reservationTypeService.addReservationType(createReservationTypeDto);
    }
    getReservationById(id) {
        return this.reservationTypeService.getReservationTypeById(id);
    }
    editReservationTypeById(id, createReservationTypeDto) {
        return this.reservationTypeService.editReservationTypeById(id, createReservationTypeDto);
    }
    deleteReservationTypeById(id) {
        return this.reservationTypeService.deleteReservationTypeById(id);
    }
    getReservationByPlaceId(placeId) {
        return this.reservationTypeService.getReservationTypesByPlaceId(placeId);
    }
    getReservationTypeReservations(id) {
        return this.reservationTypeService.getReservationTypeReservations(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "getReservation", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_type_dto_1.CreateReservationTypeDto]),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "addReservation", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "getReservationById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_reservation_type_dto_1.CreateReservationTypeDto]),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "editReservationTypeById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "deleteReservationTypeById", null);
__decorate([
    (0, common_1.Get)('/getByPlace/:placeId'),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationTypeController.prototype, "getReservationByPlaceId", null);
__decorate([
    (0, common_1.Get)('/getReservationTypeReservations/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationTypeController.prototype, "getReservationTypeReservations", null);
ReservationTypeController = __decorate([
    (0, common_1.Controller)('reservationType'),
    (0, common_1.UseGuards)((0, roles_guard_1.default)(create_membership_user_dto_1.Role.ADMIN)),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [reservation_type_service_1.ReservationTypeService])
], ReservationTypeController);
exports.ReservationTypeController = ReservationTypeController;
//# sourceMappingURL=reservation%D9%80type.controller.js.map