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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room-dto");
const rooms_service_1 = require("./rooms.service");
let RoomsController = class RoomsController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    getRooms(name) {
        return this.roomService.getRooms(name);
    }
    addRoom(createRoomDto) {
        return this.roomService.addRoom(createRoomDto);
    }
    editRoomById(id, createRoomDto) {
        return this.roomService.editRoomById(id, createRoomDto);
    }
    deleteRoomById(id) {
        return this.roomService.deleteRoomById(id);
    }
    getRoomsByReservationTypeId(reservationTypeId) {
        return this.roomService.getRoomsByReservationTypeId(reservationTypeId);
    }
    getRoomsByPlaceId(placeId) {
        return this.roomService.getRoomsByPlaceId(placeId);
    }
    getRoomById(id) {
        return this.roomService.getRoomById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addRoom", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "editRoomById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "deleteRoomById", null);
__decorate([
    (0, common_1.Get)('/getRoomsByReservationType?'),
    __param(0, (0, common_1.Query)('reservationTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomsByReservationTypeId", null);
__decorate([
    (0, common_1.Get)('/getRoomsByPlace?'),
    __param(0, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomsByPlaceId", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomById", null);
RoomsController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map