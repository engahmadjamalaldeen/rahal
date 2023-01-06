import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityImageRepository } from 'src/city_images/city.image.repository';
import { getRepository } from 'typeorm';
import { City } from './city.entity';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city-dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityRepository)
        private readonly cityRepository: CityRepository,
        @InjectRepository(CityImageRepository)
        private cityImageRepository: CityImageRepository
    ) { }


    async getCities(): Promise<City[]> {
        const found = await this.cityRepository.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images').getMany();

        for(let i = 0; i < found.length; i++){
            delete found[i].customers;
        }
        return found;
    }

    async addCity(createCityDto: CreateCityDto): Promise<City> {
        return this.cityRepository.addCity(createCityDto);
    }

    async addImages(urls: string[], cityId: number): Promise<City> {
        const city = await this.cityRepository.findOne({where: {id: cityId}});
        if(!city){
            throw new NotFoundException(`city ID ${cityId} not found`);
        }
        const cityImages = await this.cityImageRepository.addCityImage(urls, cityId);
        city.images = cityImages;
        return city;
    }

    async getCityById(id: number): Promise<City> {
        const found = await this.cityRepository.findOne({ where: { id: id }, relations: ["places", "customers", "blogs"]});

        if (!found) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }

        delete found.customers;
        delete found.blogs;
        for(let i = 0; i < found.places.length; i++){
            delete found.places[i].reservations;
        }
        return found;
    }

    async editCityById(id: number, createCityDto: CreateCityDto){
        const {name, description, nameAR, descriptionAR} = createCityDto;
        let found = await this.cityRepository.findOne({ where: { id: id } });

        console.log(found);
        console.log(name);
        console.log(description);
        if (!found) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }

        const updated = await this.cityRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, description: description, nameAR: nameAR, descriptionAR: descriptionAR })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.cityRepository.findOne({ where: { id: id } });

        return found;
    }

    async deleteCityById(id: number): Promise<boolean> {
        const found = await this.cityRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }

        this.cityRepository.remove(found);
        return true;
    }
}
