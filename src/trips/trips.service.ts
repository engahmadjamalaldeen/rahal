import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/customer.repository';
import { AddParticipentDto } from './dto/add-participent-dto';
import { CreateTripDto } from './dto/create-trip-dto';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripsService {
    constructor(
        @InjectRepository(TripRepository)
        private tripRepository: TripRepository,
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository
    ) {}

    async getTrips(): Promise<Trip[]> {
        const found = await this.tripRepository.createQueryBuilder('Trip').leftJoinAndSelect('Trip.participents', 'participents').getMany();

        for(let i = 0; i < found.length; i++){
            for(let j = 0; j < found[i].participents.length; j++){
                delete found[i].participents[j].password;
                delete found[i].participents[j].salt;
            }
        }

        return found;
    }

    async addTrip(createTripDto: CreateTripDto): Promise<Trip> {
        return this.tripRepository.addTrip(createTripDto, this.customerRepository);
    }

    async getTripById(id: number): Promise<Trip> {
        const found = await this.tripRepository.findOne({where: {id: id}});

        if(!found) {
            throw new NotFoundException(`Trip with ID ${id} not found`);
        }

        return found;
    }

    async addParticipent(addParticipentDto: AddParticipentDto): Promise<Trip> {
        return this.tripRepository.addParticipent(addParticipentDto, this.customerRepository);
    }
}
