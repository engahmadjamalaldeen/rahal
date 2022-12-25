"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const place_repository_1 = require("../places/place.repository");
const membership_repository_1 = require("./membership.repository");
const memberships_controller_1 = require("./memberships.controller");
const memberships_service_1 = require("./memberships.service");
let MembershipsModule = class MembershipsModule {
};
MembershipsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([membership_repository_1.MembershipRepository, place_repository_1.PlaceRepository])
        ],
        controllers: [memberships_controller_1.MembershipsController],
        providers: [memberships_service_1.MembershipsService]
    })
], MembershipsModule);
exports.MembershipsModule = MembershipsModule;
//# sourceMappingURL=memberships.module.js.map