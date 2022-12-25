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
exports.MembershipsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const place_repository_1 = require("../places/place.repository");
const membership_repository_1 = require("./membership.repository");
let MembershipsService = class MembershipsService {
    constructor(membershipRepository, placeRepository) {
        this.membershipRepository = membershipRepository;
        this.placeRepository = placeRepository;
    }
    async getMemberships() {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.users', 'users')
            .leftJoinAndSelect('Membership.place', 'place')
            .getMany();
        for (let i = 0; i < found.length; i++) {
            for (let j = 0; j < found[i].users.length; j++) {
                delete found[i].users[j].accessToken;
                delete found[i].users[j].salt;
                delete found[i].users[j].password;
            }
        }
        return found;
    }
    async addMembership(createMembershipDto) {
        let membership = await this.membershipRepository.addMembership(createMembershipDto, this.placeRepository);
        try {
            await this.membershipRepository.save(membership);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Error code:" + e.code);
        }
        return membership;
    }
    async getMembershipById(id) {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .leftJoinAndSelect('Membership.users', 'membership')
            .where("Membership.id = :id", { id: id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Membership with ID ${id} not found`);
        }
        return found;
    }
    async deleteMembershipById(id) {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .where("Membership.id = :id", { id: id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Membership with ID ${id} not found`);
        }
        const place = await this.placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect("Place.reservations", "reservations")
            .where("Place.id = :id", { id: found.place.id })
            .getOne();
        if (place.reservations.length > 0) {
            throw new common_1.ForbiddenException("This membership have reservations, can't delete it");
        }
        await this.placeRepository.createQueryBuilder()
            .update(place)
            .set({ isMembership: false })
            .where("id = :id", { id: found.place.id })
            .execute();
        this.membershipRepository.remove(found);
        return true;
    }
};
MembershipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membership_repository_1.MembershipRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __metadata("design:paramtypes", [membership_repository_1.MembershipRepository,
        place_repository_1.PlaceRepository])
], MembershipsService);
exports.MembershipsService = MembershipsService;
//# sourceMappingURL=memberships.service.js.map