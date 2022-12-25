import { CityImageRepository } from 'src/city_images/city.image.repository';
import { City } from './city.entity';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city-dto';
export declare class CitiesService {
    private readonly cityRepository;
    private cityImageRepository;
    constructor(cityRepository: CityRepository, cityImageRepository: CityImageRepository);
    getCities(): Promise<City[]>;
    addCity(createCityDto: CreateCityDto): Promise<City>;
    addImages(urls: string[], cityId: number): Promise<City>;
    getCityById(id: number): Promise<City>;
    editCityById(id: number, createCityDto: CreateCityDto): Promise<City>;
    deleteCityById(id: number): Promise<boolean>;
}
