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
exports.MembershipUser = void 0;
const typeorm_1 = require("typeorm");
const membership_entity_1 = require("../memberships/membership.entity");
const class_transformer_1 = require("class-transformer");
const bcrypt = require("bcrypt");
const create_membership_user_dto_1 = require("./dto/create-membership-user-dto");
let MembershipUser = class MembershipUser extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MembershipUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], MembershipUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MembershipUser.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MembershipUser.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MembershipUser.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MembershipUser.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => membership_entity_1.Membership, membership => membership.users),
    __metadata("design:type", membership_entity_1.Membership)
], MembershipUser.prototype, "membership", void 0);
MembershipUser = __decorate([
    (0, typeorm_1.Entity)()
], MembershipUser);
exports.MembershipUser = MembershipUser;
//# sourceMappingURL=membership-user.entity.js.map