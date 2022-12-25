import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateMembershipDto } from "./dto/create-membership-dto";
import { Membership } from "./membership.entity";
export declare class MembershipRepository extends Repository<Membership> {
    addMembership(createMembershipDto: CreateMembershipDto, placeRepository: PlaceRepository): Promise<Membership>;
}
