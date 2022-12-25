import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceRepository } from 'src/places/place.repository';
import { CreateMembershipDto } from './dto/create-membership-dto';
import { Membership } from './membership.entity';
import { MembershipRepository } from './membership.repository';

@Injectable()
export class MembershipsService {
    constructor(
        @InjectRepository(MembershipRepository)
        private membershipRepository: MembershipRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository
    ) { }


    async getMemberships(): Promise<Membership[]> {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.users', 'users')
            .leftJoinAndSelect('Membership.place', 'place')
            .getMany();

        for(let i = 0; i < found.length; i++){
            for(let j = 0; j < found[i].users.length; j++){
                delete found[i].users[j].accessToken;
                delete found[i].users[j].salt;
                delete found[i].users[j].password;
            }
        }

        return found;
    }

    async addMembership(createMembershipDto: CreateMembershipDto): Promise<Membership> {
        let membership = await this.membershipRepository.addMembership(createMembershipDto, this.placeRepository);

        try{
            await this.membershipRepository.save(membership);
        }catch(e){
            throw new InternalServerErrorException("Error code:"+ e.code);
        }

        return membership;
    }

    async getMembershipById(id: number): Promise<Membership> {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .leftJoinAndSelect('Membership.users', 'membership')
            .where("Membership.id = :id", {id: id})
            .getOne();

        if (!found) {
            throw new NotFoundException(`Membership with ID ${id} not found`);
        }

        return found;
    }

    async deleteMembershipById(id: number): Promise<boolean> {
        const found = await this.membershipRepository.createQueryBuilder('Membership')
            .leftJoinAndSelect('Membership.place', 'place')
            .where("Membership.id = :id", {id: id})
            .getOne();

        if (!found) {
            throw new NotFoundException(`Membership with ID ${id} not found`);
        }

        const place = await this.placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect("Place.reservations", "reservations")
            .where("Place.id = :id", {id: found.place.id})
            .getOne();
        
        if(place.reservations.length > 0){
            throw new ForbiddenException("This membership have reservations, can't delete it");
        }


        await this.placeRepository.createQueryBuilder()
            .update(place)
            .set({ isMembership: false })
            .where("id = :id", { id: found.place.id })
            .execute();

        this.membershipRepository.remove(found);
        return true;
    }
}
