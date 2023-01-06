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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const class_transformer_1 = require("class-transformer");
const customer_entity_1 = require("../customers/customer.entity");
const create_place_dto_1 = require("../places/dto/create-place-dto");
const place_entity_1 = require("../places/place.entity");
const room_entity_1 = require("../rooms/room.entity");
const typeorm_1 = require("typeorm");
const create_client_reservation_dto_1 = require("./dto/create-client-reservation-dto");
let Reservation = class Reservation extends typeorm_1.BaseEntity {
    setComputed() {
        let fromDateTime = new Date(this.fromDate);
        let toDateTime = new Date(this.toDate);
        this.numOfDays = Math.floor(Math.abs(fromDateTime - toDateTime) / (1000 * 60 * 60 * 24));
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "placeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Transform)(x => new Date()),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Reservation.prototype, "fromDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(x => new Date()),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Reservation.prototype, "toDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.reservations),
    __metadata("design:type", customer_entity_1.Customer)
], Reservation.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_entity_1.Place, place => place.reservations),
    __metadata("design:type", place_entity_1.Place)
], Reservation.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, room => room.reservations),
    __metadata("design:type", room_entity_1.Room)
], Reservation.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reservation.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Reservation.prototype, "numOfDays", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Reservation.prototype, "setComputed", null);
Reservation = __decorate([
    (0, typeorm_1.Entity)()
], Reservation);
exports.Reservation = Reservation;
//# sourceMappingURL=reservation.entity.js.map