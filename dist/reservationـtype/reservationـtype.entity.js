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
exports.ReservationType = void 0;
const amenities_entity_1 = require("../amenities/amenities.entity");
const place_entity_1 = require("../places/place.entity");
const room_entity_1 = require("../rooms/room.entity");
const typeorm_1 = require("typeorm");
const create_reservation_type_dto_1 = require("./dto/create-reservation-type-dto");
let ReservationType = class ReservationType extends typeorm_1.BaseEntity {
    setComputed() {
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReservationType.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationType.prototype, "priceType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, room => room.reservationType),
    __metadata("design:type", Array)
], ReservationType.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.ManyToOne)(() => place_entity_1.Place, place => place.reservationsTypes),
    __metadata("design:type", Number)
], ReservationType.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => amenities_entity_1.Amenity, amenity => amenity.reservationTypes, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ReservationType.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationType.prototype, "setComputed", null);
ReservationType = __decorate([
    (0, typeorm_1.Entity)()
], ReservationType);
exports.ReservationType = ReservationType;
//# sourceMappingURL=reservation%D9%80type.entity.js.map