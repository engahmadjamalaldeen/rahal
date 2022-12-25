"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const membership_entity_1 = require("./membership.entity");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
let MembershipRepository = class MembershipRepository extends typeorm_1.Repository {
    async addMembership(createMembershipDto, placeRepository) {
        const { placeId } = createMembershipDto;
        const membership = new membership_entity_1.Membership();
        const found = await placeRepository.findOne({ where: { id: placeId } });
        if (found) {
            found.isMembership = true;
            placeRepository.createQueryBuilder()
                .update(found)
                .set({ isMembership: true })
                .where("id = :id", { id: found.id })
                .execute();
            membership.place = found;
        }
        else {
            throw new common_1.NotFoundException("Place Id not found");
        }
        membership.users = [];
        return membership;
    }
};
MembershipRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(membership_entity_1.Membership)
], MembershipRepository);
exports.MembershipRepository = MembershipRepository;
//# sourceMappingURL=membership.repository.js.map