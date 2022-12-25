/// <reference types="multer" />
import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city-dto';
export declare class CitiesController {
    private citiesService;
    constructor(citiesService: CitiesService);
    getCities(): Promise<City[]>;
    addCity(createCityDto: CreateCityDto): Promise<City>;
    uploadFile(file: Express.Multer.File, cityId: number, req: Request, fileName: string): Promise<City>;
    getCityById(id: number): Promise<City>;
    editCityById(id: number, createCityDto: CreateCityDto): Promise<City>;
    deleteCityById(id: number): Promise<boolean>;
}
