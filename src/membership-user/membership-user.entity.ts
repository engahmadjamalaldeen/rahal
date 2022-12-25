import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Membership } from "src/memberships/membership.entity";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { Role } from "./dto/create-membership-user-dto";

@Entity()
export class MembershipUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    role: Role;

    @Column({ unique: true })
    accessToken: string;

    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column()
    salt: string;

    @ManyToOne(() => Membership, membership => membership.users)
    membership: Membership;


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}