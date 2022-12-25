import { CreateMembershipUserDto } from './dto/create-membership-user-dto';
import { SignInMembershipUserDto } from './dto/signin-membership-user-dto';
import { MembershipUser } from './membership-user.entity';
import { MembershipUserService } from './membership-user.service';
export declare class MembershipUserController {
    private membershipUserService;
    constructor(membershipUserService: MembershipUserService);
    getCities(): Promise<MembershipUser[]>;
    addCity(createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser>;
    signIn(signInMembershipUserDto: SignInMembershipUserDto): Promise<{
        accessToken: string;
    }>;
    getCityById(id: number): Promise<MembershipUser>;
    editMembershipById(id: number, createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser>;
    deleteMembershipById(id: number): Promise<boolean>;
}
