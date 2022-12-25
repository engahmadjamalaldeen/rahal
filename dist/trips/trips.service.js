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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_repository_1 = require("../customers/customer.repository");
const trip_repository_1 = require("./trip.repository");
let TripsService = class TripsService {
    constructor(tripRepository, customerRepository) {
        this.tripRepository = tripRepository;
        this.customerRepository = customerRepository;
    }
    async getTrips() {
        const found = await this.tripRepository.createQueryBuilder('Trip').leftJoinAndSelect('Trip.participents', 'participents').getMany();
        for (let i = 0; i < found.length; i++) {
            for (let j = 0; j < found[i].participents.length; j++) {
                delete found[i].participents[j].password;
                delete found[i].participents[j].salt;
            }
        }
        return found;
    }
    async addTrip(createTripDto) {
        return this.tripRepository.addTrip(createTripDto, this.customerRepository);
    }
    async getTripById(id) {
        const found = await this.tripRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return found;
    }
    async addParticipent(addParticipentDto) {
        return this.tripRepository.addParticipent(addParticipentDto, this.customerRepository);
    }
};
TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trip_repository_1.TripRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_repository_1.CustomerRepository)),
    __metadata("design:paramtypes", [trip_repository_1.TripRepository,
        customer_repository_1.CustomerRepository])
], TripsService);
exports.TripsService = TripsService;
//# sourceMappingURL=trips.service.js.map