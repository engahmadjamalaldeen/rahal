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
exports.PlacesController = void 0;
const common_1 = require("@nestjs/common");
const create_place_dto_1 = require("./dto/create-place-dto");
const places_service_1 = require("./places.service");
let PlacesController = class PlacesController {
    constructor(placesService) {
        this.placesService = placesService;
    }
    getPlaces(offset, limit) {
        return this.placesService.getPlaces(offset, limit);
    }
    getPlacesByFilters(id, type, cityId) {
        return this.placesService.getPlacesByFilters(id, type, cityId);
    }
    searchPlacesAndCiteies(query) {
        return this.placesService.searchPlacesAndCiteies(query);
    }
    getMembershipPlaces() {
        return this.placesService.getMembershipPlaces();
    }
    getTopVisitedPlaces() {
        return this.placesService.getTopVisitedPlaces();
    }
    getPlaceById(id) {
        return this.placesService.getPlaceById(id);
    }
    editPlaceById(id, createPlaceDto) {
        return this.placesService.editPlaceById(id, createPlaceDto);
    }
    addPlace(createPlaceDto) {
        return this.placesService.addPlace(createPlaceDto);
    }
    deletePlaceById(id) {
        return this.placesService.deletePlaceById(id);
    }
    getPlaceReservations(id) {
        return this.placesService.getPlaceReservations(id);
    }
    getPlaceReviews(id, offset, limit) {
        return this.placesService.getPlaceReviews(id, offset, limit);
    }
    getPlaceReservationTypes(id) {
        return this.placesService.getPlaceReservationTypes(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('offset')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "getPlaces", null);
__decorate([
    (0, common_1.Get)('/search?'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlacesByFilters", null);
__decorate([
    (0, common_1.Get)('/searchPlacesAndCiteies?'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "searchPlacesAndCiteies", null);
__decorate([
    (0, common_1.Get)("/membershipPlaces"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getMembershipPlaces", null);
__decorate([
    (0, common_1.Get)('/getTopVisitedPlaces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "getTopVisitedPlaces", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlaceById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "editPlaceById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "addPlace", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "deletePlaceById", null);
__decorate([
    (0, common_1.Get)('/getReservations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getPlaceReservations", null);
__decorate([
    (0, common_1.Get)('/getPlaceReviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "getPlaceReviews", null);
__decorate([
    (0, common_1.Get)('/getPlaceReservationTypes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "getPlaceReservationTypes", null);
PlacesController = __decorate([
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesController);
exports.PlacesController = PlacesController;
//# sourceMappingURL=places.controller.js.map