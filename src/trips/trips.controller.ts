import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddParticipentDto } from './dto/add-participent-dto';
import { CreateTripDto } from './dto/create-trip-dto';
import { Trip } from './trip.entity';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
    constructor(private tripsService: TripsService){}


    @Get('')
    getTrips(): Promise<Trip[]> {
        return this.tripsService.getTrips();
    }

    @Post('/addTrip')
    @UsePipes(ValidationPipe)
    addTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
        return this.tripsService.addTrip(createTripDto);
    }

    @Get('/:id')
    getTripById(@Param('id', ParseIntPipe) id: number): Promise<Trip> {
        return this.tripsService.getTripById(id);
    }

    @Post('/addParticipent')
    addParticipent(@Body() addParticipentDto: AddParticipentDto): Promise<Trip> {
        return this.tripsService.addParticipent(addParticipentDto);
    }
}
