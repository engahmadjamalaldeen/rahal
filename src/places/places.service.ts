import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { env } from 'process';
import { CityRepository } from 'src/cities/city.repository';
import { InterestRepository } from 'src/interests/interest.repository';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { ReservationType } from 'src/reservationـtype/reservationـtype.entity';
import { ReviewRepository } from 'src/reviews/review.repository';
import internal from 'stream';
import { CreatePlaceDto, PlaceType } from './dto/create-place-dto';
import { Place } from './place.entity';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository,
        @InjectRepository(CityRepository)
        private cityRepository: CityRepository,
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository,
        @InjectRepository(InterestRepository)
        private interestRepository: InterestRepository,
        @InjectRepository(ReservationTypeRepository)
        private reservationTypeRepository: ReservationTypeRepository,
        @InjectRepository(MembershipRepository)
        private membershipRepository: MembershipRepository,
    ) {}

    async getPlaces(offset: number, limit: number) {
        const found = await this.placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect('Place.reservations', 'reservations')
            .leftJoinAndSelect('Place.reservationsTypes', 'reservationTypes')
            .leftJoinAndSelect('Place.tags', 'tags')
            .leftJoinAndSelect('Place.membership', 'membership')
            .leftJoinAndSelect('Place.city', 'city')
            .leftJoinAndSelect('Place.reviews', 'reviews')
            .take(offset) //lIMITS its to 4
            .skip(limit) //offset 5 entitities.
            .getMany();
            let prev = limit - 10;
            let next =  +limit + 10;
            // return +limit + 10;
            if(prev < 0) {
                prev = 0;
            }
            var map = {
                'places': found,
                'prev': env.APP_URL + "places?offset=" + (10) + "&limit=" +  prev,
                'next':  env.APP_URL + "places?offset=" + (10) + "&limit=" + next ,
            };
        return map;
    }

    async getPlaceById(id: number): Promise<Place> {
        // .findOne({where: {id: id}, relations: ['city', 'tags', 'reviews']});
        let place = await this.placeRepository.createQueryBuilder('Place')
        .leftJoinAndSelect('Place.city', 'city')
        .leftJoinAndSelect('Place.tags', 'tags')
        .leftJoinAndSelect('Place.reviews', 'reviews')
        .leftJoinAndSelect('reviews.customer', 'customer')
        .leftJoinAndSelect('Place.reservationsTypes', 'reservationsTypes')
        .leftJoinAndSelect('reservationsTypes.amenities', 'amenities')
        .where('Place.id = :id', {id})
        .getOne();

        for(let i = 0; i < place.reviews.length; i++){
            delete place.reviews[i].customer.accessToken;
            delete place.reviews[i].customer.password;
            delete place.reviews[i].customer.salt;
        }

        return place;
    }

    async editPlaceById(id: number, createPlaceDto: CreatePlaceDto){
        const {name, price, description, type, cityId, interestsIds} = createPlaceDto;
        let found = await this.placeRepository.findOne({ where: { id: id }, relations: ['city', 'tags'] });

        if (!found) {
            throw new NotFoundException(`Place with ID ${id} not found`);
        }

        const city = await this.cityRepository.findOne({ where: { id: cityId }});
        if(!city){
            throw new NotFoundException(`City ID: ${cityId} not found`);
        }

        found.tags = [];
        if(interestsIds !== undefined){
            for(let i = 0; i < interestsIds.length; i++){
                let interest = await this.interestRepository.findOne({ where: { id: interestsIds[i] }});
                if(!interest)
                    throw new NotFoundException(`Interest ID: ${interestsIds[i]} not found`);
                found.tags.push(interest);
            }
            await this.placeRepository.save(found);
        }

        const updated = await this.placeRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, price: price, description: description, type: type, city: city })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.placeRepository.findOne({ where: { id: id }, relations: ['city'] });

        return found;
    }

    async getMembershipPlaces(): Promise<Place[]> {
        const found = await this.placeRepository.find({where: {isMembership: true}, relations: ['city']});

        return found;
    }

    async getTopVisitedPlaces(){
        let found =  await this.placeRepository
        .createQueryBuilder('place')
        .leftJoinAndSelect('place.reservations', 'reservations')
        .leftJoinAndSelect('place.city', 'city')
        .groupBy('place.id') 
        .addGroupBy('city.name') 
        .select('place.name', "name")
        .addSelect('place.type', "type")
        .addSelect('city.name', 'cityName')
        .addSelect('place.cityId', 'cityId')
        .addSelect('place.description', 'description')
        .addSelect('place.id, count(reservations.id) as reservations')
        .orderBy('count(reservations.id)', 'DESC')
        .limit(5)
        .having("count(reservations.id) > :count", {count: 0})
        .execute();



        // let found = await this.placeRepository.createQueryBuilder('place')
        // .select('place.name')
        // .addSelect('COUNT(reservations)', "reservationsCount")
        // .leftJoinAndSelect('place.reservations', 'reservations')
        // .groupBy('Place.id')
        // .orderBy(`"reservationsCount"`, 'DESC')
        // .limit(5)
        // .getQuery();

        // for(let i = 0; i < found.length; i++){
        //     console.log(found[i].reservations);
        //     if(found[i].numOfReservations == 0){
        //         delete found[i];
        //     }
        // }
        // console.log(found);

        return found;
    }

    async addPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
        return this.placeRepository.addPlace(createPlaceDto, this.interestRepository, this.cityRepository);
    }
    async searchPlacesAndCiteies(query: string) {
        let resultPlaces = [];
        let resultCiteies = []; 
        // return query;
        // if(query !== undefined){
        //     throw new NotFoundException(`Result not found`);  
        // }
        resultPlaces = await this.placeRepository.createQueryBuilder('Place').where("Place.name like :name", { name:`%${query}%` }).getMany();
        resultCiteies = await this.cityRepository.createQueryBuilder('City').where("City.name like :name", { name:`%${query}%` }).getMany();
        var result = {
            "Places": resultPlaces,
            "Citeies": resultCiteies
          };
        return result;
    }
    async getPlacesByFilters(id: number, type: PlaceType, cityId: number): Promise<Place[]> {
        let found = []; 

        if(id !== undefined && type !== undefined && cityId !== undefined){
            let city = await this.cityRepository.findOne({where: {id: cityId}});
            if(!city){
                throw new NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where([{id: id}, {type: type}, {city: city}]).getMany();
        }
        else if(type !== undefined && cityId !== undefined){
            let city = await this.cityRepository.findOne({where: {id: cityId}});
            if(!city){
                throw new NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where("type = :type AND Place.city.id = :cityId", {type, cityId}).getMany();
        }
        else if(id !== undefined && cityId !== undefined){
            let city = await this.cityRepository.findOne({where: {id: cityId}});
            if(!city){
                throw new NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where("id = :id AND Place.city.id = :cityId", {id, cityId}).getMany();
        }
        else if(id !== undefined && type !== undefined){
            found = await this.placeRepository.find({where: {id: id, type: type}});
        }
        else if(type !== undefined){
            found = await this.placeRepository.find({where: {type: type}});
        }
        else if(cityId !== undefined){
            let city = await this.cityRepository.findOne({where: {id: cityId}});
            if(!city){
                throw new NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where([{city: city}]).getMany();
        }
        else if(id !== undefined){
            found = await this.placeRepository.find({where: {id: id}});
        }
        

        return found;
    }

    ///TODO
    async deletePlaceById(id: number){
        const found = await this.placeRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Place with ID ${id} not found`);
        }

        const reviews = await this.reviewRepository.createQueryBuilder('Review').leftJoinAndSelect('Review.customer', 'customer').where({place: found}).getMany();
        for(let i = 0; i < reviews.length; i++){
            this.reviewRepository.remove(reviews[i]);
        }


        const reservationsTypes = await this.reservationTypeRepository.find({ where: { placeId: id } });
        for(let i = 0; i < reservationsTypes.length; i++){
            let reservationType = await this.reservationTypeRepository.remove(reservationsTypes[i]);
            if(!reservationType){
                return false;
            }
        }

        if(found.isMembership == true){
            const membership = await this.membershipRepository.createQueryBuilder('Membership').where("Membership.id = :id", {id: id}).leftJoinAndSelect('Membership.place', 'place').getOne();
            this.membershipRepository.remove(membership);
        }

        let place = await this.placeRepository.remove(found);
        if(!place){
            return false;
        }
        return true;
    }

    async getPlaceReservations(id: number): Promise<Reservation[]> {
        const found = await this.placeRepository.createQueryBuilder('Place').where({id: id}).leftJoinAndSelect('Place.reservations', 'reservations').getMany();
        
        return found[0].reservations;
    }

    async getPlaceReviews(id: number,offset: number, limit: number) {
        const found = await this.placeRepository.findOne({where: {id: id}});
        if(!found){
            throw new NotFoundException('Place not found');
        }

        const reviews = await this.reviewRepository.createQueryBuilder('Review')
        .leftJoinAndSelect('Review.customer', 'customer').
        where({place: found})
        .take(offset) //lIMITS its to 4
        .skip(limit) //offset 5 entitities.
        .getMany();

        let prev = limit - 10;
        let next =  +limit + 10;
        if(prev < 0) {
            prev = 0;
        }
        for(let i = 0; i < reviews.length; i++){
            delete reviews[i].customer.accessToken;
            delete reviews[i].customer.password;
            delete reviews[i].customer.salt;
        }
        var map = {
            'reviews': reviews,
            'prev': env.APP_URL + "places/getPlaceReviews/" + id + "?offset=" + (10) + "&limit=" +  prev,
            'next':  env.APP_URL + "places/getPlaceReviews/" + id + "?offset=" + (10) + "&limit=" + next ,
        };
        
        

        return map;
    }

    async getPlaceReservationTypes(id: number) {
        const found = await this.placeRepository.findOne({where: {id: id}});
        if(!found){
            throw new NotFoundException('Place not found');
        }

        const reservationsTypes = await this.reservationTypeRepository.find({ where: { placeId: id } });
        

        return reservationsTypes;
    }
}
