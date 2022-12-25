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
exports.InterestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_repository_1 = require("../customers/customer.repository");
const place_repository_1 = require("../places/place.repository");
const interest_repository_1 = require("./interest.repository");
let InterestsService = class InterestsService {
    constructor(interestRepository, customerRepository, placeRepository) {
        this.interestRepository = interestRepository;
        this.customerRepository = customerRepository;
        this.placeRepository = placeRepository;
    }
    async getInterests() {
        const found = await this.interestRepository.createQueryBuilder('Interest').leftJoinAndSelect('Interest.customers', 'customers').leftJoinAndSelect('Interest.places', 'places').getMany();
        for (let i = 0; i < found.length; i++) {
            for (let j = 0; j < found[i].customers.length; j++) {
                delete found[i].customers[j].accessToken;
                delete found[i].customers[j].salt;
                delete found[i].customers[j].password;
            }
        }
        return found;
    }
    async addInterest(createInterestDto) {
        return this.interestRepository.addInterest(createInterestDto);
    }
    async getInterestById(id) {
        const found = await this.interestRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Interest with ID ${id} not found`);
        }
        return found;
    }
    async editInterestById(id, createInterestDto) {
        const { name, image } = createInterestDto;
        let found = await this.interestRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Interest with ID ${id} not found`);
        }
        const updated = await this.interestRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, image: image })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.interestRepository.findOne({ where: { id: id } });
        return found;
    }
    async deleteInterestById(id) {
        const found = await this.interestRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Interest with ID ${id} not found`);
        }
        this.interestRepository.remove(found);
        return true;
    }
    async addInterestsToCustomer(addInterestsToCustomerDto) {
        const { customerId, interestsIds } = addInterestsToCustomerDto;
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });
        for (let i = 0; i < interestsIds.length; i++) {
            let found = await this.interestRepository.findOne({ where: { id: interestsIds[i] } });
            if (found) {
                if (customer) {
                    if (customer.interests !== undefined) {
                        customer.interests.push(found);
                        this.customerRepository.save(customer);
                    }
                    else {
                        customer.interests = [];
                        customer.interests.push(found);
                        this.customerRepository.save(customer);
                    }
                }
                else {
                    throw new common_1.NotFoundException("Customer Id not found");
                }
            }
            else {
                throw new common_1.NotFoundException("Interests Id not found");
            }
        }
        delete customer.accessToken;
        delete customer.password;
        delete customer.salt;
        return customer;
    }
    async addInterestsToPlace(addInterestsToPlaceDto) {
        const { placeId, interestsIds } = addInterestsToPlaceDto;
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        for (let i = 0; i < interestsIds.length; i++) {
            let found = await this.interestRepository.findOne({ where: { id: interestsIds[i] } });
            if (found) {
                if (place) {
                    if (place.tags !== undefined) {
                        place.tags.push(found);
                        this.placeRepository.save(place);
                    }
                    else {
                        place.tags = [];
                        place.tags.push(found);
                        this.placeRepository.save(place);
                    }
                }
                else {
                    throw new common_1.NotFoundException("place Id not found");
                }
            }
            else {
                throw new common_1.NotFoundException("Interests Id not found");
            }
        }
        return place;
    }
    async getPlacesByInterestName(interestName, cityId) {
        const found = await this.interestRepository
            .createQueryBuilder("interest")
            .leftJoinAndSelect('interest.places', 'places')
            .leftJoinAndSelect('places.city', 'city')
            .where("interest.name ILIKE :name", { name: `%${interestName}%` })
            .getOne();
        if (cityId) {
            const found1 = await this.interestRepository
                .createQueryBuilder("interest")
                .leftJoinAndSelect('interest.places', 'places')
                .leftJoinAndSelect('places.city', 'city')
                .where("interest.name ILIKE :name", { name: `%${interestName}%` })
                .andWhere('city.id = :cityId', { cityId })
                .getOne();
            return found1.places;
        }
        if (!found) {
            throw new common_1.NotFoundException(`Interest name: ${interestName} not found`);
        }
        return found.places;
    }
};
InterestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(interest_repository_1.InterestRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_repository_1.CustomerRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __metadata("design:paramtypes", [interest_repository_1.InterestRepository,
        customer_repository_1.CustomerRepository,
        place_repository_1.PlaceRepository])
], InterestsService);
exports.InterestsService = InterestsService;
//# sourceMappingURL=interests.service.js.map