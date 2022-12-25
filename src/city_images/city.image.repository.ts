import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { CityImage } from "./city_image.entity";

@CustomRepository(CityImage)
export class CityImageRepository extends Repository<CityImage> {
    async addCityImage(urls: string[], cityId: number): Promise<CityImage[]> {
        let cityImages = [];

        for(let i = 0; i < urls.length; i++){
            const cityImage = new CityImage();
            cityImage.url = urls[i];
            cityImage.cityId = cityId;
            await this.save(cityImage);
            cityImages.push(cityImage);
        }

        return cityImages;

    }
}