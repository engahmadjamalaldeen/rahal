import { AddParticipentDto } from './dto/add-participent-dto';
import { CreateTripDto } from './dto/create-trip-dto';
import { Trip } from './trip.entity';
import { TripsService } from './trips.service';
export declare class TripsController {
    private tripsService;
    constructor(tripsService: TripsService);
    getTrips(): Promise<Trip[]>;
    addTrip(createTripDto: CreateTripDto): Promise<Trip>;
    getTripById(id: number): Promise<Trip>;
    addParticipent(addParticipentDto: AddParticipentDto): Promise<Trip>;
}
