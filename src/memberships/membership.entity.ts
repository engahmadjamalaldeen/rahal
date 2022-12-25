import { Place } from "src/places/place.entity";
import { BaseEntity, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MembershipUser } from "src/membership-user/membership-user.entity";

@Entity()
export class Membership extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Place, place => place.membership)
    @JoinColumn()
    place: Place;

    @OneToMany(() => MembershipUser, membershipUser => membershipUser.membership)
    users: MembershipUser[];
}