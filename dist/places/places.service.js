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
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const process_1 = require("process");
const city_repository_1 = require("../cities/city.repository");
const interest_repository_1 = require("../interests/interest.repository");
const membership_repository_1 = require("../memberships/membership.repository");
const reservation_type_repository_1 = require("../reservation\u0640type/reservation.type.repository");
const review_repository_1 = require("../reviews/review.repository");
const place_repository_1 = require("./place.repository");
let PlacesService = class PlacesService {
    constructor(placeRepository, cityRepository, reviewRepository, interestRepository, reservationTypeRepository, membershipRepository) {
        this.placeRepository = placeRepository;
        this.cityRepository = cityRepository;
        this.reviewRepository = reviewRepository;
        this.interestRepository = interestRepository;
        this.reservationTypeRepository = reservationTypeRepository;
        this.membershipRepository = membershipRepository;
    }
    async getPlaces(offset, limit) {
        const found = await this.placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect('Place.reservations', 'reservations')
            .leftJoinAndSelect('Place.reservationsTypes', 'reservationTypes')
            .leftJoinAndSelect('Place.tags', 'tags')
            .leftJoinAndSelect('Place.membership', 'membership')
            .leftJoinAndSelect('Place.city', 'city')
            .leftJoinAndSelect('Place.reviews', 'reviews')
            .take(offset)
            .skip(limit)
            .getMany();
        let prev = limit - 10;
        let next = +limit + 10;
        if (prev < 0) {
            prev = 0;
        }
        var map = {
            'places': found,
            'prev': process_1.env.APP_URL + "places?offset=" + (10) + "&limit=" + prev,
            'next': process_1.env.APP_URL + "places?offset=" + (10) + "&limit=" + next,
        };
        return map;
    }
    async getPlaceById(id) {
        let place = await this.placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect('Place.city', 'city')
            .leftJoinAndSelect('Place.tags', 'tags')
            .leftJoinAndSelect('Place.reviews', 'reviews')
            .leftJoinAndSelect('reviews.customer', 'customer')
            .leftJoinAndSelect('Place.reservationsTypes', 'reservationsTypes')
            .leftJoinAndSelect('reservationsTypes.amenities', 'amenities')
            .where('Place.id = :id', { id })
            .getOne();
        for (let i = 0; i < place.reviews.length; i++) {
            delete place.reviews[i].customer.accessToken;
            delete place.reviews[i].customer.password;
            delete place.reviews[i].customer.salt;
        }
        return place;
    }
    async editPlaceById(id, createPlaceDto) {
        const { name, price, description, type, cityId, interestsIds } = createPlaceDto;
        let found = await this.placeRepository.findOne({ where: { id: id }, relations: ['city', 'tags'] });
        if (!found) {
            throw new common_1.NotFoundException(`Place with ID ${id} not found`);
        }
        const city = await this.cityRepository.findOne({ where: { id: cityId } });
        if (!city) {
            throw new common_1.NotFoundException(`City ID: ${cityId} not found`);
        }
        found.tags = [];
        if (interestsIds !== undefined) {
            for (let i = 0; i < interestsIds.length; i++) {
                let interest = await this.interestRepository.findOne({ where: { id: interestsIds[i] } });
                if (!interest)
                    throw new common_1.NotFoundException(`Interest ID: ${interestsIds[i]} not found`);
                found.tags.push(interest);
            }
            await this.placeRepository.save(found);
        }
        const updated = await this.placeRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, price: price, description: description, type: type, city: city })
            .where("id = :id", { id: found.id })
            .execute();
        found = await this.placeRepository.findOne({ where: { id: id }, relations: ['city'] });
        return found;
    }
    async getMembershipPlaces() {
        const found = await this.placeRepository.find({ where: { isMembership: true }, relations: ['city'] });
        return found;
    }
    async getTopVisitedPlaces() {
        let found = await this.placeRepository
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.reservations', 'reservations')
            .leftJoinAndSelect('place.city', 'city')
            .groupBy('place.id')
            .addGroupBy('city.name')
            .select('place.name', "name")
            .addSelect('place.type', "type")
            .addSelect('city.name', 'cityName')
            .addSelect('place.cityId', 'cityId')
            .addSelect('place.description', 'description')
            .addSelect('place.id, count(reservations.id) as reservations')
            .orderBy('count(reservations.id)', 'DESC')
            .limit(5)
            .having("count(reservations.id) > :count", { count: 0 })
            .execute();
        return found;
    }
    async addPlace(createPlaceDto) {
        return this.placeRepository.addPlace(createPlaceDto, this.interestRepository, this.cityRepository);
    }
    async searchPlacesAndCiteies(query) {
        let resultPlaces = [];
        let resultCiteies = [];
        resultPlaces = await this.placeRepository.createQueryBuilder('Place').where("Place.name like :name", { name: `%${query}%` }).getMany();
        resultCiteies = await this.cityRepository.createQueryBuilder('City').where("City.name like :name", { name: `%${query}%` }).getMany();
        var result = {
            "Places": resultPlaces,
            "Citeies": resultCiteies
        };
        return result;
    }
    async getPlacesByFilters(id, type, cityId) {
        let found = [];
        if (id !== undefined && type !== undefined && cityId !== undefined) {
            let city = await this.cityRepository.findOne({ where: { id: cityId } });
            if (!city) {
                throw new common_1.NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where([{ id: id }, { type: type }, { city: city }]).getMany();
        }
        else if (type !== undefined && cityId !== undefined) {
            let city = await this.cityRepository.findOne({ where: { id: cityId } });
            if (!city) {
                throw new common_1.NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where("type = :type AND Place.city.id = :cityId", { type, cityId }).getMany();
        }
        else if (id !== undefined && cityId !== undefined) {
            let city = await this.cityRepository.findOne({ where: { id: cityId } });
            if (!city) {
                throw new common_1.NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where("id = :id AND Place.city.id = :cityId", { id, cityId }).getMany();
        }
        else if (id !== undefined && type !== undefined) {
            found = await this.placeRepository.find({ where: { id: id, type: type } });
        }
        else if (type !== undefined) {
            found = await this.placeRepository.find({ where: { type: type } });
        }
        else if (cityId !== undefined) {
            let city = await this.cityRepository.findOne({ where: { id: cityId } });
            if (!city) {
                throw new common_1.NotFoundException(`City ID : ${cityId} not found`);
            }
            found = await this.placeRepository.createQueryBuilder('Place').where([{ city: city }]).getMany();
        }
        else if (id !== undefined) {
            found = await this.placeRepository.find({ where: { id: id } });
        }
        return found;
    }
    async deletePlaceById(id) {
        const found = await this.placeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Place with ID ${id} not found`);
        }
        const reviews = await this.reviewRepository.createQueryBuilder('Review').leftJoinAndSelect('Review.customer', 'customer').where({ place: found }).getMany();
        for (let i = 0; i < reviews.length; i++) {
            this.reviewRepository.remove(reviews[i]);
        }
        const reservationsTypes = await this.reservationTypeRepository.find({ where: { placeId: id } });
        for (let i = 0; i < reservationsTypes.length; i++) {
            let reservationType = await this.reservationTypeRepository.remove(reservationsTypes[i]);
            if (!reservationType) {
                return false;
            }
        }
        if (found.isMembership == true) {
            const membership = await this.membershipRepository.createQueryBuilder('Membership').where("Membership.id = :id", { id: id }).leftJoinAndSelect('Membership.place', 'place').getOne();
            this.membershipRepository.remove(membership);
        }
        let place = await this.placeRepository.remove(found);
        if (!place) {
            return false;
        }
        return true;
    }
    async getPlaceReservations(id) {
        const found = await this.placeRepository.createQueryBuilder('Place').where({ id: id }).leftJoinAndSelect('Place.reservations', 'reservations').getMany();
        return found[0].reservations;
    }
    async getPlaceReviews(id, offset, limit) {
        const found = await this.placeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Place not found');
        }
        const reviews = await this.reviewRepository.createQueryBuilder('Review')
            .leftJoinAndSelect('Review.customer', 'customer').
            where({ place: found })
            .take(offset)
            .skip(limit)
            .getMany();
        let prev = limit - 10;
        let next = +limit + 10;
        if (prev < 0) {
            prev = 0;
        }
        for (let i = 0; i < reviews.length; i++) {
            delete reviews[i].customer.accessToken;
            delete reviews[i].customer.password;
            delete reviews[i].customer.salt;
        }
        var map = {
            'reviews': reviews,
            'prev': process_1.env.APP_URL + "places/getPlaceReviews/" + id + "?offset=" + (10) + "&limit=" + prev,
            'next': process_1.env.APP_URL + "places/getPlaceReviews/" + id + "?offset=" + (10) + "&limit=" + next,
        };
        return map;
    }
    async getPlaceReservationTypes(id) {
        const found = await this.placeRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Place not found');
        }
        const reservationsTypes = await this.reservationTypeRepository.find({ where: { placeId: id } });
        return reservationsTypes;
    }
};
PlacesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(city_repository_1.CityRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(review_repository_1.ReviewRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(interest_repository_1.InterestRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(reservation_type_repository_1.ReservationTypeRepository)),
    __param(5, (0, typeorm_1.InjectRepository)(membership_repository_1.MembershipRepository)),
    __metadata("design:paramtypes", [place_repository_1.PlaceRepository,
        city_repository_1.CityRepository,
        review_repository_1.ReviewRepository,
        interest_repository_1.InterestRepository,
        reservation_type_repository_1.ReservationTypeRepository,
        membership_repository_1.MembershipRepository])
], PlacesService);
exports.PlacesService = PlacesService;
//# sourceMappingURL=places.service.js.map