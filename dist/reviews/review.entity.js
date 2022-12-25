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
exports.Review = void 0;
const customer_entity_1 = require("../customers/customer.entity");
const place_entity_1 = require("../places/place.entity");
const typeorm_1 = require("typeorm");
let Review = class Review extends typeorm_1.BaseEntity {
    setComputed() {
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Review.prototype, "reviewText", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Review.prototype, "reviewMark", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.reviews, { eager: true }),
    __metadata("design:type", customer_entity_1.Customer)
], Review.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_entity_1.Place, place => place.reviews),
    __metadata("design:type", place_entity_1.Place)
], Review.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Review.prototype, "setComputed", null);
Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);
exports.Review = Review;
//# sourceMappingURL=review.entity.js.map