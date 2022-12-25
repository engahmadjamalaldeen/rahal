import { JwtService } from '@nestjs/jwt';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { CreateMembershipUserDto } from './dto/create-membership-user-dto';
import { SignInMembershipUserDto } from './dto/signin-membership-user-dto';
import { MembershipUser } from './membership-user.entity';
import { MembershipUserRepository } from './membership-user.repository';
export declare class MembershipUserService {
    private membershipUserRepository;
    private membershipRepository;
    private jwtService;
    constructor(membershipUserRepository: MembershipUserRepository, membershipRepository: MembershipRepository, jwtService: JwtService);
    getMembershipsUser(): Promise<MembershipUser[]>;
    addMembershipUser(createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser>;
    signIn(signInMembershipUserDto: SignInMembershipUserDto): Promise<{
        accessToken: string;
    }>;
    getMembershipUserById(id: number): Promise<MembershipUser>;
    editMembershipUserById(id: number, createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser>;
    deleteMembershipUserById(id: number): Promise<boolean>;
}
