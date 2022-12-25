import { PlaceRepository } from 'src/places/place.repository';
import { CreateMembershipDto } from './dto/create-membership-dto';
import { Membership } from './membership.entity';
import { MembershipRepository } from './membership.repository';
export declare class MembershipsService {
    private membershipRepository;
    private placeRepository;
    constructor(membershipRepository: MembershipRepository, placeRepository: PlaceRepository);
    getMemberships(): Promise<Membership[]>;
    addMembership(createMembershipDto: CreateMembershipDto): Promise<Membership>;
    getMembershipById(id: number): Promise<Membership>;
    deleteMembershipById(id: number): Promise<boolean>;
}
