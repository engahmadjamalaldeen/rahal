"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const amenities_entity_1 = require("./amenities.entity");
let AmenityRepository = class AmenityRepository extends typeorm_1.Repository {
    async addAmenity(createAmenityDto, reservationTypeRepository) {
        const { name, nameAR, image } = createAmenityDto;
        const amenity = new amenities_entity_1.Amenity();
        amenity.name = name;
        amenity.nameAR = nameAR;
        amenity.image = image;
        await this.save(amenity);
        return amenity;
    }
};
AmenityRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(amenities_entity_1.Amenity)
], AmenityRepository);
exports.AmenityRepository = AmenityRepository;
//# sourceMappingURL=amenities.repository.js.map