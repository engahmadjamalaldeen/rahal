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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipUserController = void 0;
const common_1 = require("@nestjs/common");
const create_membership_user_dto_1 = require("./dto/create-membership-user-dto");
const signin_membership_user_dto_1 = require("./dto/signin-membership-user-dto");
const membership_user_service_1 = require("./membership-user.service");
let MembershipUserController = class MembershipUserController {
    constructor(membershipUserService) {
        this.membershipUserService = membershipUserService;
    }
    getCities() {
        return this.membershipUserService.getMembershipsUser();
    }
    addCity(createMembershipUserDto) {
        return this.membershipUserService.addMembershipUser(createMembershipUserDto);
    }
    signIn(signInMembershipUserDto) {
        return this.membershipUserService.signIn(signInMembershipUserDto);
    }
    getCityById(id) {
        return this.membershipUserService.getMembershipUserById(id);
    }
    editMembershipById(id, createMembershipUserDto) {
        return this.membershipUserService.editMembershipUserById(id, createMembershipUserDto);
    }
    deleteMembershipById(id) {
        return this.membershipUserService.deleteMembershipUserById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "getCities", null);
__decorate([
    (0, common_1.Post)('/addUser'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_membership_user_dto_1.CreateMembershipUserDto]),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "addCity", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_membership_user_dto_1.SignInMembershipUserDto]),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "getCityById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_membership_user_dto_1.CreateMembershipUserDto]),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "editMembershipById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MembershipUserController.prototype, "deleteMembershipById", null);
MembershipUserController = __decorate([
    (0, common_1.Controller)('membershipUsers'),
    __metadata("design:paramtypes", [membership_user_service_1.MembershipUserService])
], MembershipUserController);
exports.MembershipUserController = MembershipUserController;
//# sourceMappingURL=membership-user.controller.js.map