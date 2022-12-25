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
exports.MembershipUserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const membership_repository_1 = require("../memberships/membership.repository");
const membership_user_repository_1 = require("./membership-user.repository");
let MembershipUserService = class MembershipUserService {
    constructor(membershipUserRepository, membershipRepository, jwtService) {
        this.membershipUserRepository = membershipUserRepository;
        this.membershipRepository = membershipRepository;
        this.jwtService = jwtService;
    }
    async getMembershipsUser() {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.place', 'place')
            .getMany();
        console.log(found);
        for (let i = 0; i < found.length; i++) {
            delete found[i].accessToken;
            delete found[i].password;
            delete found[i].salt;
        }
        return found;
    }
    async addMembershipUser(createMembershipUserDto) {
        const { username, password, membershipId } = createMembershipUserDto;
        let membership = await this.membershipUserRepository.addMembershipUser(createMembershipUserDto, this.membershipRepository);
        let payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        membership.accessToken = accessToken;
        try {
            await this.membershipUserRepository.save(membership);
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException("Phone already exists");
            }
            throw new common_1.InternalServerErrorException("Error code:" + e.code);
        }
        delete membership.password;
        delete membership.salt;
        return membership;
    }
    async signIn(signInMembershipUserDto) {
        let membershipUser = await this.membershipUserRepository.validatePassword(signInMembershipUserDto, this.membershipRepository);
        if (!membershipUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const membership = await this.membershipRepository
            .createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .leftJoinAndSelect('Membership.users', 'users')
            .where("Membership.id = :id", { id: membershipUser.membership.id })
            .getOne();
        console.log("HALO ");
        console.log(membership);
        if (membership.place.isMembership == false) {
            throw new common_1.ForbiddenException(`This place is no longer a Membership`);
        }
        let username = membershipUser.username;
        let payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        await this.membershipUserRepository.createQueryBuilder()
            .update(membershipUser)
            .set({ accessToken: accessToken })
            .where("id = :id", { id: membershipUser.id })
            .execute();
        membershipUser = await this.membershipUserRepository.validatePassword(signInMembershipUserDto, this.membershipRepository);
        delete membershipUser.password;
        delete membershipUser.salt;
        return membershipUser;
    }
    async getMembershipUserById(id) {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.place', 'place')
            .where("MembershipUser.id = :id", { id: id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Membership User with ID ${id} not found`);
        }
        delete found.accessToken;
        delete found.password;
        delete found.salt;
        return found;
    }
    async editMembershipUserById(id, createMembershipUserDto) {
        let membershipUser = await this.membershipUserRepository.editMembershipUserById(id, createMembershipUserDto);
        return membershipUser;
    }
    async deleteMembershipUserById(id) {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .where("MembershipUser.id = :id", { id: id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Membership User with ID ${id} not found`);
        }
        const membership = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect("Membership.users", "users")
            .where("Membership.id = :id", { id: found.membership.id })
            .getOne();
        let membershipUsers = found.membership.users;
        await this.membershipRepository.createQueryBuilder()
            .update(membership)
            .set({ users: membershipUsers })
            .where("id = :id", { id: found.membership.id })
            .execute();
        this.membershipUserRepository.remove(found);
        return true;
    }
};
MembershipUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membership_user_repository_1.MembershipUserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_repository_1.MembershipRepository)),
    __metadata("design:paramtypes", [membership_user_repository_1.MembershipUserRepository,
        membership_repository_1.MembershipRepository,
        jwt_1.JwtService])
], MembershipUserService);
exports.MembershipUserService = MembershipUserService;
//# sourceMappingURL=membership-user.service.js.map