"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const create_place_dto_1 = require("./dto/create-place-dto");
const place_entity_1 = require("./place.entity");
let PlaceRepository = class PlaceRepository extends typeorm_1.Repository {
    async addPlace(createPlaceDto, interestRepository, cityRepository) {
        const { name, nameAR, usdPrice, price, description, descriptionAR, type, cityId, interestsIds } = createPlaceDto;
        let city = await cityRepository.findOne({ where: { id: cityId } });
        if (!city) {
            throw new common_1.NotFoundException(`City ID : ${cityId} not found`);
        }
        const place = new place_entity_1.Place();
        place.name = name;
        place.description = description;
        place.nameAR = nameAR;
        place.descriptionAR = descriptionAR;
        place.city = city;
        place.price = price;
        place.usdPrice = usdPrice;
        place.isMembership = false;
        if (Object.values(create_place_dto_1.PlaceType).includes(type)) {
            place.type = type;
        }
        else {
            throw new common_1.ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
        }
        place.tags = [];
        if (interestsIds !== undefined) {
            for (let i = 0; i < interestsIds.length; i++) {
                let interest = await interestRepository.findOne({ where: { id: interestsIds[i] } });
                if (interest) {
                    place.tags.push(interest);
                }
                else {
                    throw new common_1.NotFoundException("Interest Id not found");
                }
            }
        }
        await this.save(place);
        return place;
    }
};
PlaceRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(place_entity_1.Place)
], PlaceRepository);
exports.PlaceRepository = PlaceRepository;
//# sourceMappingURL=place.repository.js.map