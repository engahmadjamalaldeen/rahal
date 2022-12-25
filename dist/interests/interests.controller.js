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
exports.InterestsController = void 0;
const common_1 = require("@nestjs/common");
const add_interests_to_customer_dto_1 = require("./dto/add-interests-to-customer-dto");
const add_interests_to_place_dto_1 = require("./dto/add-interests-to-place-dto");
const create_interest_dto_1 = require("./dto/create-interest-dto");
const interests_service_1 = require("./interests.service");
let InterestsController = class InterestsController {
    constructor(interestsService) {
        this.interestsService = interestsService;
    }
    getInterests() {
        return this.interestsService.getInterests();
    }
    getPlacesByInterestName(interestName, cityId) {
        return this.interestsService.getPlacesByInterestName(interestName, cityId);
    }
    addInterest(createInterestDto) {
        return this.interestsService.addInterest(createInterestDto);
    }
    getInterestById(id) {
        return this.interestsService.getInterestById(id);
    }
    addInterestsToCustomer(addInterestsToCustomerDto) {
        return this.interestsService.addInterestsToCustomer(addInterestsToCustomerDto);
    }
    addInterestsToPlace(addInterestsToPlaceDto) {
        return this.interestsService.addInterestsToPlace(addInterestsToPlaceDto);
    }
    editInterestById(id, createInterestDto) {
        return this.interestsService.editInterestById(id, createInterestDto);
    }
    deleteInterestById(id) {
        return this.interestsService.deleteInterestById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterestsController.prototype, "getInterests", null);
__decorate([
    (0, common_1.Get)('/getPlaceByInterest'),
    __param(0, (0, common_1.Query)('interestName')),
    __param(1, (0, common_1.Query)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "getPlacesByInterestName", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interest_dto_1.CreateInterestDto]),
    __metadata("design:returntype", Promise)
], InterestsController.prototype, "addInterest", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterestsController.prototype, "getInterestById", null);
__decorate([
    (0, common_1.Put)('/addInterestsToCustomer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_interests_to_customer_dto_1.AddInterestsToCustomerDto]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "addInterestsToCustomer", null);
__decorate([
    (0, common_1.Put)('/addInterestsToPlace'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_interests_to_place_dto_1.AddInterestsToPlaceDto]),
    __metadata("design:returntype", void 0)
], InterestsController.prototype, "addInterestsToPlace", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_interest_dto_1.CreateInterestDto]),
    __metadata("design:returntype", Promise)
], InterestsController.prototype, "editInterestById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterestsController.prototype, "deleteInterestById", null);
InterestsController = __decorate([
    (0, common_1.Controller)('interests'),
    __metadata("design:paramtypes", [interests_service_1.InterestsService])
], InterestsController);
exports.InterestsController = InterestsController;
//# sourceMappingURL=interests.controller.js.map