import { NotFoundException } from "@nestjs/common";
import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateMembershipDto } from "./dto/create-membership-dto";
import { Membership } from "./membership.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";

@CustomRepository(Membership)
export class MembershipRepository extends Repository<Membership> {
    async addMembership(createMembershipDto: CreateMembershipDto, placeRepository: PlaceRepository): Promise<Membership> {
        const { placeId } = createMembershipDto;

        const membership = new Membership();
        
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
            throw new NotFoundException("Place Id not found");
        }
        
        membership.users = [];

        return membership;
    }
}