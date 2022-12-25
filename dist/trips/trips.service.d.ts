import { CustomerRepository } from 'src/customers/customer.repository';
import { AddParticipentDto } from './dto/add-participent-dto';
import { CreateTripDto } from './dto/create-trip-dto';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';
export declare class TripsService {
    private tripRepository;
    private customerRepository;
    constructor(tripRepository: TripRepository, customerRepository: CustomerRepository);
    getTrips(): Promise<Trip[]>;
    addTrip(createTripDto: CreateTripDto): Promise<Trip>;
    getTripById(id: number): Promise<Trip>;
    addParticipent(addParticipentDto: AddParticipentDto): Promise<Trip>;
}
