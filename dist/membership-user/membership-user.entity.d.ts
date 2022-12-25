import { BaseEntity } from "typeorm";
import { Membership } from "src/memberships/membership.entity";
import { Role } from "./dto/create-membership-user-dto";
export declare class MembershipUser extends BaseEntity {
    id: number;
    role: Role;
    accessToken: string;
    username: string;
    password: string;
    salt: string;
    membership: Membership;
    validatePassword(password: string): Promise<boolean>;
}
