import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CityRepository } from "src/cities/city.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { InterestRepository } from "src/interests/interest.repository";
import { Repository } from "typeorm";
import { CreatePlaceDto, PlaceType } from "./dto/create-place-dto";
import { Place } from "./place.entity";

@CustomRepository(Place)
export class PlaceRepository extends Repository<Place> {
    async addPlace(createPlaceDto: CreatePlaceDto, interestRepository: InterestRepository, cityRepository: CityRepository): Promise<Place> {
        const { name, price, description, type, cityId, interestsIds } = createPlaceDto;
        
        let city = await cityRepository.findOne({where: {id: cityId}});
        if(!city){
            throw new NotFoundException(`City ID : ${cityId} not found`);
        }
        const place = new Place();
        place.name = name;
        place.description = description;
        place.city = city;
        place.price = price;
        place.isMembership = false;
        if(Object.values(PlaceType).includes(type)){
            place.type = type;
        }
        else{
            throw new ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
        }

        place.tags = [];
        if(interestsIds !== undefined){
            for(let i = 0; i < interestsIds.length; i++){
                let interest = await interestRepository.findOne({ where: { id: interestsIds[i] } });
                if (interest) {
                    place.tags.push(interest);
                }
                else {
                    throw new NotFoundException("Interest Id not found");
                }
            }
        }

        await this.save(place);

        return place;
    }
}