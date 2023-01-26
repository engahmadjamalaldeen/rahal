import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city-dto';
export declare class CitiesController {
    private citiesService;
    constructor(citiesService: CitiesService);
    uploadedFile(file: any): Promise<{
        originalname: any;
        filename: any;
    }>;
    seeUploadedFile(image: any, res: any): any;
    getCities(): Promise<City[]>;
    addCity(createCityDto: CreateCityDto): Promise<City>;
    getCityById(id: number): Promise<City>;
    editCityById(id: number, createCityDto: CreateCityDto): Promise<City>;
    deleteCityById(id: number): Promise<boolean>;
}
