"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const interest_entity_1 = require("./interest.entity");
let InterestRepository = class InterestRepository extends typeorm_1.Repository {
    async addInterest(createInterestDto) {
        const { name, image } = createInterestDto;
        const interest = new interest_entity_1.Interest();
        interest.name = name;
        interest.image = image;
        await this.save(interest);
        return interest;
    }
};
InterestRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(interest_entity_1.Interest)
], InterestRepository);
exports.InterestRepository = InterestRepository;
//# sourceMappingURL=interest.repository.js.map