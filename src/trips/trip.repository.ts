import { NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "src/customers/customer.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AddParticipentDto } from "./dto/add-participent-dto";
import { CreateTripDto } from "./dto/create-trip-dto";
import { Trip } from "./trip.entity";

@CustomRepository(Trip)
export class TripRepository extends Repository<Trip> {
    async addTrip(createTripDto: CreateTripDto, customerRepository: CustomerRepository) {
        const {creatorId, title} = createTripDto;

        const trip = new Trip();

        const found = await customerRepository.findOne({ where: { id: creatorId } });
        if (found) {
            trip.creatorId = creatorId;
            trip.title = title;
        }
        else {
            throw new NotFoundException("Customer Id not found");
        }

        await trip.save();

        return trip;
    }

    async addParticipent(addParticipentDto: AddParticipentDto, customerRepository: CustomerRepository) {
        const {tripId, customerId} = addParticipentDto;
        const found = await this.findOne({where: {id: tripId}});
        if(found){
            const customer = await customerRepository.findOne({where: {id: customerId}});
            if(customer){
                if(customer.tripsParticipated !== undefined){
                    customer.tripsParticipated.push(found);
                    customer.save();
                }
                else{
                    customer.tripsParticipated = [];
                    customer.tripsParticipated.push(found);
                    customer.save();
                }
            }
            else{
                throw new NotFoundException("Customer Id not found");
            }
        }
        else{
            throw new NotFoundException("Trip Id not found");
        }
        return found;
    }
}