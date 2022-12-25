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
exports.Membership = void 0;
const place_entity_1 = require("../places/place.entity");
const typeorm_1 = require("typeorm");
const membership_user_entity_1 = require("../membership-user/membership-user.entity");
let Membership = class Membership extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Membership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => place_entity_1.Place, place => place.membership),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", place_entity_1.Place)
], Membership.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => membership_user_entity_1.MembershipUser, membershipUser => membershipUser.membership),
    __metadata("design:type", Array)
], Membership.prototype, "users", void 0);
Membership = __decorate([
    (0, typeorm_1.Entity)()
], Membership);
exports.Membership = Membership;
//# sourceMappingURL=membership.entity.js.map