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
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const add_participent_dto_1 = require("./dto/add-participent-dto");
const create_trip_dto_1 = require("./dto/create-trip-dto");
const trips_service_1 = require("./trips.service");
let TripsController = class TripsController {
    constructor(tripsService) {
        this.tripsService = tripsService;
    }
    getTrips() {
        return this.tripsService.getTrips();
    }
    addTrip(createTripDto) {
        return this.tripsService.addTrip(createTripDto);
    }
    getTripById(id) {
        return this.tripsService.getTripById(id);
    }
    addParticipent(addParticipentDto) {
        return this.tripsService.addParticipent(addParticipentDto);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "getTrips", null);
__decorate([
    (0, common_1.Post)('/addTrip'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "addTrip", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "getTripById", null);
__decorate([
    (0, common_1.Post)('/addParticipent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_participent_dto_1.AddParticipentDto]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "addParticipent", null);
TripsController = __decorate([
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trips_service_1.TripsService])
], TripsController);
exports.TripsController = TripsController;
//# sourceMappingURL=trips.controller.js.map