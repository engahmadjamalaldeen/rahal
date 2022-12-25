"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const membership_user_entity_1 = require("./membership-user.entity");
const create_membership_user_dto_1 = require("./dto/create-membership-user-dto");
let MembershipUserRepository = class MembershipUserRepository extends typeorm_1.Repository {
    async addMembershipUser(createMembershipUserDto, nembershipRepository) {
        const { username, password, membershipId, role } = createMembershipUserDto;
        const salt = await bcrypt.genSalt();
        const membershipUser = new membership_user_entity_1.MembershipUser();
        membershipUser.username = username;
        membershipUser.password = await this.hashPassword(password, salt);
        membershipUser.salt = salt;
        if (!Object.values(create_membership_user_dto_1.Role).includes(role)) {
            throw new common_1.ForbiddenException('Membership User Role should be {ADMIN, MANAGER, RECEPTIONIST}');
        }
        membershipUser.role = role;
        const found = await nembershipRepository.findOne({ where: { id: membershipId }, relations: ['users'] });
        console.log(found);
        if (found) {
            membershipUser.membership = found;
        }
        else {
            throw new common_1.NotFoundException("Membership Id not found");
        }
        return membershipUser;
    }
    async editMembershipUserById(id, createMembershipUserDto) {
        const { username, password } = createMembershipUserDto;
        let found = await this.createQueryBuilder('MembershipUser')
            .where("MembershipUser.id = :id", { id: id })
            .leftJoinAndSelect('MembershipUser.Membership', 'membership')
            .leftJoinAndSelect('membership.place', 'place')
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Membership User with ID ${id} not found`);
        }
        const salt = await bcrypt.genSalt();
        if (password !== undefined) {
            const updated = await this.createQueryBuilder()
                .update(found)
                .set({ username: username, password: await this.hashPassword(password, salt), salt: salt })
                .where("id = :id", { id: found.id })
                .execute();
        }
        else {
            const updated = await this.createQueryBuilder()
                .update(found)
                .set({ username: username })
                .where("id = :id", { id: found.id })
                .execute();
        }
        found = await this.findOne({ where: { id: id }, relations: ['membership'] });
        delete found.accessToken;
        delete found.password;
        delete found.salt;
        return found;
    }
    async validatePassword(signInMembershipUserDto, nembershipRepository) {
        const { username, password } = signInMembershipUserDto;
        const user = await this.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.users', 'users')
            .leftJoinAndSelect('membership.place', 'place')
            .leftJoinAndSelect('place.tags', 'tags')
            .where("MembershipUser.username = :username", { username: username })
            .getOne();
        if (user && await user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
MembershipUserRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(membership_user_entity_1.MembershipUser)
], MembershipUserRepository);
exports.MembershipUserRepository = MembershipUserRepository;
//# sourceMappingURL=membership-user.repository.js.map