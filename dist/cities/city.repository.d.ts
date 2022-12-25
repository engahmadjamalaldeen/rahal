import { Repository } from "typeorm";
import { City } from "./city.entity";
import { CreateCityDto } from "./dto/create-city-dto";
export declare class CityRepository extends Repository<City> {
    addCity(createCityDto: CreateCityDto): Promise<City>;
}
