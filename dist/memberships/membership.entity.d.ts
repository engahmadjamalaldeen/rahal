import { Place } from "src/places/place.entity";
import { BaseEntity } from "typeorm";
import { MembershipUser } from "src/membership-user/membership-user.entity";
export declare class Membership extends BaseEntity {
    id: number;
    place: Place;
    users: MembershipUser[];
}
