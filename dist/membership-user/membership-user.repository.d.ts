import { Repository } from "typeorm";
import { MembershipUser } from "./membership-user.entity";
import { CreateMembershipUserDto } from "./dto/create-membership-user-dto";
import { MembershipRepository } from "src/memberships/membership.repository";
import { SignInMembershipUserDto } from "./dto/signin-membership-user-dto";
export declare class MembershipUserRepository extends Repository<MembershipUser> {
    addMembershipUser(createMembershipUserDto: CreateMembershipUserDto, nembershipRepository: MembershipRepository): Promise<MembershipUser>;
    editMembershipUserById(id: number, createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser>;
    validatePassword(signInMembershipUserDto: SignInMembershipUserDto, nembershipRepository: MembershipRepository): Promise<MembershipUser>;
    private hashPassword;
}
