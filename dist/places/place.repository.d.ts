import { CityRepository } from "src/cities/city.repository";
import { InterestRepository } from "src/interests/interest.repository";
import { Repository } from "typeorm";
import { CreatePlaceDto } from "./dto/create-place-dto";
import { Place } from "./place.entity";
export declare class PlaceRepository extends Repository<Place> {
    addPlace(createPlaceDto: CreatePlaceDto, interestRepository: InterestRepository, cityRepository: CityRepository): Promise<Place>;
}
