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
exports.Interest = void 0;
const customer_entity_1 = require("../customers/customer.entity");
const place_entity_1 = require("../places/place.entity");
const typeorm_1 = require("typeorm");
let Interest = class Interest extends typeorm_1.BaseEntity {
    setComputed() {
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Interest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Interest.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Interest.prototype, "nameAR", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Interest.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => customer_entity_1.Customer, customer => customer.interests, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Interest.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => place_entity_1.Place, place => place.tags),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Interest.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Interest.prototype, "setComputed", null);
Interest = __decorate([
    (0, typeorm_1.Entity)()
], Interest);
exports.Interest = Interest;
//# sourceMappingURL=interest.entity.js.map