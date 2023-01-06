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
exports.Place = void 0;
const city_entity_1 = require("../cities/city.entity");
const interest_entity_1 = require("../interests/interest.entity");
const membership_entity_1 = require("../memberships/membership.entity");
const reservation_entity_1 = require("../reservation/reservation.entity");
const reservation_type_entity_1 = require("../reservation\u0640type/reservation\u0640type.entity");
const review_entity_1 = require("../reviews/review.entity");
const typeorm_1 = require("typeorm");
const create_place_dto_1 = require("./dto/create-place-dto");
let Place = class Place extends typeorm_1.BaseEntity {
    setComputed() {
        let sum = 0;
        if (this.reviews !== undefined) {
            for (let i = 0; i < this.reviews.length; i++) {
                sum += Number(this.reviews[i].reviewMark);
            }
            this.reviewsMark = sum / this.reviews.length;
            this.reviewsMark = Number(this.reviewsMark.toFixed(1));
            var decimal = this.reviewsMark - Math.floor(this.reviewsMark);
            if (decimal > 0.7 && decimal < 1)
                this.reviewsMark = Math.round(this.reviewsMark);
            if (decimal >= 0.3 && decimal <= 0.7)
                this.reviewsMark = Math.floor(this.reviewsMark) + 0.5;
            if (decimal >= 0.0 && decimal < 0.3)
                this.reviewsMark = Math.floor(this.reviewsMark);
        }
        if (this.reservations !== undefined) {
            this.numOfReservations = this.reservations.length;
        }
        else {
            this.numOfReservations = 0;
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Place.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "usdPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "nameAR", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "descriptionAR", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Place.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, city => city.places),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", city_entity_1.City)
], Place.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Place.prototype, "isMembership", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => membership_entity_1.Membership, membership => membership.place),
    __metadata("design:type", membership_entity_1.Membership)
], Place.prototype, "membership", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, reservation => reservation.place, { eager: true }),
    __metadata("design:type", Array)
], Place.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_type_entity_1.ReservationType, reservationType => reservationType.placeId),
    __metadata("design:type", Array)
], Place.prototype, "reservationsTypes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => interest_entity_1.Interest, interest => interest.places, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Place.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.place),
    __metadata("design:type", Array)
], Place.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Place.prototype, "setComputed", null);
Place = __decorate([
    (0, typeorm_1.Entity)()
], Place);
exports.Place = Place;
//# sourceMappingURL=place.entity.js.map