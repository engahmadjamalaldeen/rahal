"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipUserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const membership_repository_1 = require("../memberships/membership.repository");
const jwt_strategy_1 = require("./helpers/jwt.strategy");
const membership_user_controller_1 = require("./membership-user.controller");
const membership_user_repository_1 = require("./membership-user.repository");
const membership_user_service_1 = require("./membership-user.service");
let MembershipUserModule = class MembershipUserModule {
};
MembershipUserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([membership_repository_1.MembershipRepository, membership_user_repository_1.MembershipUserRepository]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            jwt_1.JwtModule.register({
                secret: 'topSecret51',
                signOptions: {
                    expiresIn: 3600,
                }
            })
        ],
        controllers: [membership_user_controller_1.MembershipUserController],
        providers: [membership_user_service_1.MembershipUserService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule]
    })
], MembershipUserModule);
exports.MembershipUserModule = MembershipUserModule;
//# sourceMappingURL=membership-user.module.js.map