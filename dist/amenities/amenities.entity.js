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
exports.Amenity = void 0;
const reservation_type_entity_1 = require("../reservation\u0640type/reservation\u0640type.entity");
const typeorm_1 = require("typeorm");
let Amenity = class Amenity extends typeorm_1.BaseEntity {
    setComputed() {
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Amenity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Amenity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Amenity.prototype, "nameAR", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Amenity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => reservation_type_entity_1.ReservationType, reservationType => reservationType.amenities),
    __metadata("design:type", Array)
], Amenity.prototype, "reservationTypes", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Amenity.prototype, "setComputed", null);
Amenity = __decorate([
    (0, typeorm_1.Entity)()
], Amenity);
exports.Amenity = Amenity;
//# sourceMappingURL=amenities.entity.js.map