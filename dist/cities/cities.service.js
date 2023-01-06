"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_image_repository_1 = require("../city_images/city.image.repository");
const city_repository_1 = require("./city.repository");
let CitiesService = class CitiesService {
    constructor(cityRepository, cityImageRepository) {
        this.cityRepository = cityRepository;
        this.cityImageRepository = cityImageRepository;
    }
    async getCities() {
        const found = await this.cityRepository.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images').getMany();
        for (let i = 0; i < found.length; i++) {
            delete found[i].customers;
        }
        return found;
    }
    async addCity(createCityDto) {
        return this.cityRepository.addCity(createCityDto);
    }
    async addImages(urls, cityId) {
        const city = await this.cityRepository.findOne({ where: { id: cityId } });
        if (!city) {
            throw new common_1.NotFoundException(`city ID ${cityId} not found`);
        }
        const cityImages = await this.cityImageRepository.addCityImage(urls, cityId);
        city.images = cityImages;
        return city;
    }
    async getCityById(id) {
        const found = await this.cityRepository.findOne({ where: { id: id }, relations: ["places", "customers", "blogs"] });
        if (!found) {
            throw new common_1.NotFoundException(`City with ID ${id} not found`);
        }
        delete found.customers;
        delete found.blogs;
        for (let i = 0; i < found.places.length; i++) {
            delete found.places[i].reservations;
        }
        return found;
    }
    async editCityById(id, createCityDto) {
        const { name, description, nameAR, descriptionAR } = createCityDto;
        let found = await this.cityRepository.findOne({ where: { id: id } });
        console.log(found);
        console.log(name);
        console.log(description);
        if (!found) {
            throw new common_1.NotFoundException(`City with ID ${id} not found`);
        }
        const updated = await this.cityRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, description: description, nameAR: nameAR, descriptionAR: descriptionAR })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.cityRepository.findOne({ where: { id: id } });
        return found;
    }
    async deleteCityById(id) {
        const found = await this.cityRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`City with ID ${id} not found`);
        }
        this.cityRepository.remove(found);
        return true;
    }
};
CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_repository_1.CityRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(city_image_repository_1.CityImageRepository)),
    __metadata("design:paramtypes", [city_repository_1.CityRepository,
        city_image_repository_1.CityImageRepository])
], CitiesService);
exports.CitiesService = CitiesService;
//# sourceMappingURL=cities.service.js.map