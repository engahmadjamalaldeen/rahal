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
exports.Customer = void 0;
const city_entity_1 = require("../cities/city.entity");
const typeorm_1 = require("typeorm");
const create_customer_dto_1 = require("./dto/create-customer-dto");
const bcrypt = require("bcrypt");
const trip_entity_1 = require("../trips/trip.entity");
const reservation_entity_1 = require("../reservation/reservation.entity");
const review_entity_1 = require("../reviews/review.entity");
const interest_entity_1 = require("../interests/interest.entity");
let Customer = class Customer extends typeorm_1.BaseEntity {
    setComputed() {
        if (this.tripsParticipated !== undefined)
            this.numOfTrpisParticipted = this.tripsParticipated.length;
        if (this.tripsCreated !== undefined)
            this.numOfTrpisCreated = this.tripsCreated.length;
        if (this.reservations !== undefined)
            this.numOfReservations = this.reservations.length;
    }
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, city => city.customers),
    __metadata("design:type", Number)
], Customer.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "numOfKids", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => interest_entity_1.Interest, interest => interest.customers),
    __metadata("design:type", Array)
], Customer.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, reservation => reservation.customer),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Customer.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trip_entity_1.Trip, trip => trip.creatorId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Customer.prototype, "tripsCreated", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => trip_entity_1.Trip, trip => trip.participents, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Customer.prototype, "tripsParticipated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.customer),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Customer.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Customer.prototype, "setComputed", null);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map