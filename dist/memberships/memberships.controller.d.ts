import { CreateMembershipDto } from './dto/create-membership-dto';
import { Membership } from './membership.entity';
import { MembershipsService } from './memberships.service';
export declare class MembershipsController {
    private membershipsService;
    constructor(membershipsService: MembershipsService);
    getCities(): Promise<Membership[]>;
    addCity(createMembershipDto: CreateMembershipDto): Promise<Membership>;
    getCityById(id: number): Promise<Membership>;
    deleteMembershipById(id: number): Promise<boolean>;
}
