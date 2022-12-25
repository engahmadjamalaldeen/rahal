import { CustomerRepository } from "src/customers/customer.repository";
import { Repository } from "typeorm";
import { AddParticipentDto } from "./dto/add-participent-dto";
import { CreateTripDto } from "./dto/create-trip-dto";
import { Trip } from "./trip.entity";
export declare class TripRepository extends Repository<Trip> {
    addTrip(createTripDto: CreateTripDto, customerRepository: CustomerRepository): Promise<Trip>;
    addParticipent(addParticipentDto: AddParticipentDto, customerRepository: CustomerRepository): Promise<Trip>;
}
