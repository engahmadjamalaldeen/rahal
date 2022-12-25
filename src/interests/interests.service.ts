import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/customer.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { AddInterestsToCustomerDto } from './dto/add-interests-to-customer-dto';
import { AddInterestsToPlaceDto } from './dto/add-interests-to-place-dto';
import { CreateInterestDto } from './dto/create-interest-dto';
import { Interest } from './interest.entity';
import { InterestRepository } from './interest.repository';

@Injectable()
export class InterestsService {
    constructor(
        @InjectRepository(InterestRepository)
        private interestRepository: InterestRepository,
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository,
    ) { }


    async getInterests(): Promise<Interest[]> {
        const found = await this.interestRepository.createQueryBuilder('Interest').leftJoinAndSelect('Interest.customers', 'customers').leftJoinAndSelect('Interest.places', 'places').getMany();

        for(let i = 0; i < found.length; i++){
            for(let j = 0; j < found[i].customers.length; j++){
                delete found[i].customers[j].accessToken;
                delete found[i].customers[j].salt;
                delete found[i].customers[j].password;
            }
        }
        return found;
    }

    async addInterest(createInterestDto: CreateInterestDto): Promise<Interest> {
        return this.interestRepository.addInterest(createInterestDto);
    }

    async getInterestById(id: number): Promise<Interest> {
        const found = await this.interestRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Interest with ID ${id} not found`);
        }

        return found;
    }

    async editInterestById(id: number, createInterestDto: CreateInterestDto): Promise<Interest> {
        const { name, image } = createInterestDto;
        let found = await this.interestRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Interest with ID ${id} not found`);
        }

        const updated = await this.interestRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, image: image })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.interestRepository.findOne({ where: { id: id } });

        return found;
    }

    async deleteInterestById(id: number): Promise<boolean> {
        const found = await this.interestRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Interest with ID ${id} not found`);
        }

        this.interestRepository.remove(found);
        return true;
    }

    async addInterestsToCustomer(addInterestsToCustomerDto: AddInterestsToCustomerDto) {
        const { customerId, interestsIds } = addInterestsToCustomerDto;
        const customer = await this.customerRepository.findOne({where: {id: customerId}});
        for(let i = 0; i < interestsIds.length; i++){
            let found = await this.interestRepository.findOne({where: {id: interestsIds[i]}});
            if(found){
                if(customer){
                    if(customer.interests !== undefined){
                        customer.interests.push(found);
                        this.customerRepository.save(customer);
                    }
                    else{
                        customer.interests = [];
                        customer.interests.push(found);
                        this.customerRepository.save(customer);
                    }
                }
                else{
                    throw new NotFoundException("Customer Id not found");
                }
            }
            else{
                throw new NotFoundException("Interests Id not found");
            }
        }

        delete customer.accessToken;
        delete customer.password;
        delete customer.salt;
        return customer;
    }

    async addInterestsToPlace(addInterestsToPlaceDto: AddInterestsToPlaceDto) {
        const { placeId, interestsIds } = addInterestsToPlaceDto;
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        for(let i = 0; i < interestsIds.length; i++){
            let found = await this.interestRepository.findOne({where: {id: interestsIds[i]}});
            if(found){
                if(place){
                    if(place.tags !== undefined){
                        place.tags.push(found);
                        this.placeRepository.save(place);
                    }
                    else{
                        place.tags = [];
                        place.tags.push(found);
                        this.placeRepository.save(place);
                    }
                }
                else{
                    throw new NotFoundException("place Id not found");
                }
            }
            else{
                throw new NotFoundException("Interests Id not found");
            }
        }
        return place;
    }

    async getPlacesByInterestName(interestName: string, cityId: number) {
        const found = await this.interestRepository
                  .createQueryBuilder("interest")
                  .leftJoinAndSelect('interest.places', 'places')
                  .leftJoinAndSelect('places.city', 'city')
                  .where("interest.name ILIKE :name", { name:`%${interestName}%` })
                  .getOne();
        if(cityId) {
            const found1 = await this.interestRepository
            .createQueryBuilder("interest")
            .leftJoinAndSelect('interest.places', 'places')
            .leftJoinAndSelect('places.city', 'city')
            .where("interest.name ILIKE :name", { name:`%${interestName}%` })
            .andWhere('city.id = :cityId', {cityId})
            .getOne();


            // const res = found1.take(offset) //lIMITS its to 4
            // .skip(limit) //offset 5 entitities.
            // .getMany();
            // let prev = limit - 10;
            // let next =  +limit + 10;
            // // return +limit + 10;
            // if(prev < 0) {
            //     prev = 0;
            // }
            // var map = {
            //     'places': found,
            //     'prev': env.APP_URL + "places?offset=" + (10) + "&limit=" +  prev,
            //     'next':  env.APP_URL + "places?offset=" + (10) + "&limit=" + next ,
            // };
            // return map;
            return found1.places;
        }
        


        if(!found) {
            throw new NotFoundException(`Interest name: ${interestName} not found`);
        }

        return found.places;
    }
}
