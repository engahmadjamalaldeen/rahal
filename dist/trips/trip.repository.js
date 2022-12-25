"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("./trip.entity");
let TripRepository = class TripRepository extends typeorm_1.Repository {
    async addTrip(createTripDto, customerRepository) {
        const { creatorId, title } = createTripDto;
        const trip = new trip_entity_1.Trip();
        const found = await customerRepository.findOne({ where: { id: creatorId } });
        if (found) {
            trip.creatorId = creatorId;
            trip.title = title;
        }
        else {
            throw new common_1.NotFoundException("Customer Id not found");
        }
        await trip.save();
        return trip;
    }
    async addParticipent(addParticipentDto, customerRepository) {
        const { tripId, customerId } = addParticipentDto;
        const found = await this.findOne({ where: { id: tripId } });
        if (found) {
            const customer = await customerRepository.findOne({ where: { id: customerId } });
            if (customer) {
                if (customer.tripsParticipated !== undefined) {
                    customer.tripsParticipated.push(found);
                    customer.save();
                }
                else {
                    customer.tripsParticipated = [];
                    customer.tripsParticipated.push(found);
                    customer.save();
                }
            }
            else {
                throw new common_1.NotFoundException("Customer Id not found");
            }
        }
        else {
            throw new common_1.NotFoundException("Trip Id not found");
        }
        return found;
    }
};
TripRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(trip_entity_1.Trip)
], TripRepository);
exports.TripRepository = TripRepository;
//# sourceMappingURL=trip.repository.js.map