import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { City } from "./city.entity";
import { CreateCityDto } from "./dto/create-city-dto";

@CustomRepository(City)
export class CityRepository extends Repository<City> {
    async addCity(createCityDto: CreateCityDto): Promise<City> {
        const { name, description, nameAR, descriptionAR  } = createCityDto;
        
        const city = new City();
        city.name = name;
        city.description = description;
        city.nameAR = nameAR;
        city.nameAR = descriptionAR;
        await this.save(city);
        // await city.save();

        let fullCity = await this.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images')
            .where("City.id = :id", {id: city.id})
            .getOne();

        return fullCity;
    }
}