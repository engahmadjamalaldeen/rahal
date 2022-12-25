import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { MembershipUser } from "./membership-user.entity";
import { CreateMembershipUserDto, Role } from "./dto/create-membership-user-dto";
import { MembershipRepository } from "src/memberships/membership.repository";
import { SignInMembershipUserDto } from "./dto/signin-membership-user-dto";

@CustomRepository(MembershipUser)
export class MembershipUserRepository extends Repository<MembershipUser> {
    async addMembershipUser(createMembershipUserDto: CreateMembershipUserDto, nembershipRepository: MembershipRepository): Promise<MembershipUser> {
        const { username, password, membershipId, role } = createMembershipUserDto;

        const salt = await bcrypt.genSalt();

        const membershipUser = new MembershipUser();
        membershipUser.username = username;
        membershipUser.password = await this.hashPassword(password, salt);
        membershipUser.salt = salt;

        if(!Object.values(Role).includes(role)){
            throw new ForbiddenException('Membership User Role should be {ADMIN, MANAGER, RECEPTIONIST}');
        }
        membershipUser.role = role;
        
        const found = await nembershipRepository.findOne({ where: { id: membershipId }, relations: ['users'] });
        console.log(found);
        if (found) {
            membershipUser.membership = found;
        }
        else {
            throw new NotFoundException("Membership Id not found");
        }
        
        return membershipUser;
    }

    async editMembershipUserById(id: number, createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser> {
        const { username, password } = createMembershipUserDto; 
        let found = await this.createQueryBuilder('MembershipUser')
        .where("MembershipUser.id = :id", {id: id})
        .leftJoinAndSelect('MembershipUser.Membership', 'membership')
        .leftJoinAndSelect('membership.place', 'place')
        .getOne();

        if (!found) {
            throw new NotFoundException(`Membership User with ID ${id} not found`);
        }

        const salt = await bcrypt.genSalt();


        if(password !== undefined){
            const updated = await this.createQueryBuilder()
            .update(found)
            .set({ username: username, password: await this.hashPassword(password, salt), salt: salt })
            .where("id = :id", { id: found.id })
            .execute();
        }
        else{
            const updated = await this.createQueryBuilder()
            .update(found)
            .set({ username: username })
            .where("id = :id", { id: found.id })
            .execute();
        }
            
        found = await this.findOne({ where: { id: id }, relations: ['membership'] });


        delete found.accessToken;
        delete found.password;
        delete found.salt;
        return found;
    }

    async validatePassword(signInMembershipUserDto: SignInMembershipUserDto, nembershipRepository: MembershipRepository): Promise<MembershipUser> {
        const {username, password} = signInMembershipUserDto;

        const user = await this.createQueryBuilder('MembershipUser')
            .leftJoinAndSelect('MembershipUser.membership', 'membership')
            .leftJoinAndSelect('membership.users', 'users')
            .leftJoinAndSelect('membership.place', 'place')
            .leftJoinAndSelect('place.tags', 'tags')
            .where("MembershipUser.username = :username", { username: username })
            .getOne();
           
        if(user && await user.validatePassword(password)){
            return user;
        }
        else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}