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
exports.AmenitiesController = void 0;
const common_1 = require("@nestjs/common");
const amenities_service_1 = require("./amenities.service");
const add_amenities_to_reservation_type_dto_1 = require("./dto/add-amenities-to-reservation-type-dto");
const create_amenitie_dto_1 = require("./dto/create-amenitie-dto");
let AmenitiesController = class AmenitiesController {
    constructor(amenitiesService) {
        this.amenitiesService = amenitiesService;
    }
    getAmenities() {
        return this.amenitiesService.getAmenities();
    }
    addAmenity(createAmenityDto) {
        return this.amenitiesService.addAmenity(createAmenityDto);
    }
    getAmenityById(id) {
        return this.amenitiesService.getAmenityById(id);
    }
    addAmenitiesToReservationType(addAmenitiesToReservationType) {
        return this.amenitiesService.addAmenitiesToReservationType(addAmenitiesToReservationType);
    }
    editAmenityById(id, createAmenityDto) {
        return this.amenitiesService.editAmenityById(id, createAmenityDto);
    }
    deleteAmenityById(id) {
        return this.amenitiesService.deleteAmenityById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "getAmenities", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_amenitie_dto_1.CreateAmenityDto]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "addAmenity", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "getAmenityById", null);
__decorate([
    (0, common_1.Put)('/addAmenitiesToReservationType'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_amenities_to_reservation_type_dto_1.AddAmenitiesToReservationType]),
    __metadata("design:returntype", void 0)
], AmenitiesController.prototype, "addAmenitiesToReservationType", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_amenitie_dto_1.CreateAmenityDto]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "editAmenityById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "deleteAmenityById", null);
AmenitiesController = __decorate([
    (0, common_1.Controller)('amenities'),
    __metadata("design:paramtypes", [amenities_service_1.AmenitiesService])
], AmenitiesController);
exports.AmenitiesController = AmenitiesController;
//# sourceMappingURL=amenities.controller.js.map