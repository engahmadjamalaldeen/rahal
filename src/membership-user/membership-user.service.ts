import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { CreateMembershipUserDto } from './dto/create-membership-user-dto';
import { SignInMembershipUserDto } from './dto/signin-membership-user-dto';
import { JwtPayload } from './helpers/jwt-payload.interface';
import { MembershipUser } from './membership-user.entity';
import { MembershipUserRepository } from './membership-user.repository';

@Injectable()
export class MembershipUserService {
    constructor(
        @InjectRepository(MembershipUserRepository)
        private membershipUserRepository: MembershipUserRepository,
        @InjectRepository(MembershipRepository)
        private membershipRepository: MembershipRepository,
        private jwtService: JwtService
    ) { }


    async getMembershipsUser(): Promise<MembershipUser[]> {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.place', 'place')
            .getMany();
            console.log(found)

        for (let i = 0; i < found.length; i++) {
            delete found[i].accessToken;
            delete found[i].password;
            delete found[i].salt;
        }
    
        return found;
    }

    async addMembershipUser(createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser> {
        const { username, password, membershipId } = createMembershipUserDto;
        let membership = await this.membershipUserRepository.addMembershipUser(createMembershipUserDto, this.membershipRepository);

        let payload: JwtPayload = { username } as JwtPayload;
        const accessToken = await this.jwtService.sign(payload);
        membership.accessToken = accessToken;

        try{
            await this.membershipUserRepository.save(membership);
        }catch(e){
            if(e.code === '23505'){
                throw new ConflictException("Username already exists");
            }
            throw new InternalServerErrorException("Error code:"+ e.code);
        }
        delete membership.password;
        delete membership.salt;

        return membership;
    }

    async signIn(signInMembershipUserDto: SignInMembershipUserDto): Promise<{accessToken: string}> {
        let membershipUser = await this.membershipUserRepository.validatePassword(signInMembershipUserDto, this.membershipRepository);

        if(!membershipUser){
            throw new UnauthorizedException('Invalid credentials');
        }

        const membership = await this.membershipRepository
            .createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .leftJoinAndSelect('Membership.users', 'users')
            .where("Membership.id = :id", { id: membershipUser.membership.id })
            .getOne();
        // test
        console.log("HALO ");
        console.log(membership);

        if(membership.place.isMembership == false){
            throw new ForbiddenException(`This place is no longer a Membership`);
        }

        let username = membershipUser.username;

        let payload: JwtPayload = { username } as JwtPayload;
        const accessToken = await this.jwtService.sign(payload);
        await this.membershipUserRepository.createQueryBuilder()
            .update(membershipUser)
            .set({ accessToken: accessToken })
            .where("id = :id", { id: membershipUser.id })
            .execute();

        membershipUser = await this.membershipUserRepository.validatePassword(signInMembershipUserDto, this.membershipRepository);
        delete membershipUser.password;
        delete membershipUser.salt;
        for (let index = 0; index < membershipUser.membership.users.length; index++) {
            delete membershipUser.membership.users[index].password;
            delete membershipUser.membership.users[index].salt;
            delete membershipUser.membership.users[index].accessToken;
        }
        return membershipUser;
    }

    async getMembershipUserById(id: number): Promise<MembershipUser> {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.place', 'place')
            .where("MembershipUser.id = :id", {id: id})
            .getOne();

        if (!found) {
            throw new NotFoundException(`Membership User with ID ${id} not found`);
        }

        delete found.accessToken;
        delete found.password;
        delete found.salt;
        return found;
    }

    async editMembershipUserById(id: number, createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser> {
        let membershipUser = await this.membershipUserRepository.editMembershipUserById(id, createMembershipUserDto);
        // const { username, password } = createMembershipDto; 
        // let found = await this.membershipRepository.createQueryBuilder('Membership')
        // .where("Membership.id = :id", {id: id})
        // .leftJoinAndSelect('Membership.place', 'place')
        // .getOne();

        // if (!found) {
        //     throw new NotFoundException(`Membership with ID ${id} not found`);
        // }


        // const updated = await this.membershipRepository.createQueryBuilder()
        //     .update(found)
        //     .set({ username: username, password: password })
        //     .where("id = :id", { id: found.id })
        //     .execute();
            
        // found = await this.membershipRepository.findOne({ where: { id: id }, relations: ['city'] });


        // delete found.accessToken;
        // delete found.password;
        // delete found.salt;
        return membershipUser;
    }

    async deleteMembershipUserById(id: number): Promise<boolean> {
        const found = await this.membershipUserRepository.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .where("MembershipUser.id = :id", {id: id})
            .getOne();

        if (!found) {
            throw new NotFoundException(`Membership User with ID ${id} not found`);
        }

        const membership = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect("Membership.users", "users")
            .where("Membership.id = :id", {id: found.membership.id})
            .getOne();

        let membershipUsers: MembershipUser[] = found.membership.users;

        await this.membershipRepository.createQueryBuilder()
            .update(membership)
            .set({ users: membershipUsers })
            .where("id = :id", { id: found.membership.id })
            .execute();

        this.membershipUserRepository.remove(found);
        return true;
    }
}
