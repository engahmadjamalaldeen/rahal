import { Repository } from "typeorm";
import { CityImage } from "./city_image.entity";
export declare class CityImageRepository extends Repository<CityImage> {
    addCityImage(urls: string[], cityId: number): Promise<CityImage[]>;
}
