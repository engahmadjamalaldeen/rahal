import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { type } from 'os';
import { Reservation } from 'src/reservation/reservation.entity';
import { CreatePlaceDto, PlaceType } from './dto/create-place-dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private placesService: PlacesService){}


    @Get('')
    getPlaces(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.placesService.getPlaces(offset, limit);
    }

    @Get('/search?')
    getPlacesByFilters(@Query('id') id: number, @Query('type') type: PlaceType, @Query('cityId') cityId: number): Promise<Place[]> {
        return this.placesService.getPlacesByFilters(id, type, cityId);
    }
    @Get('/searchPlacesAndCiteies?')
    searchPlacesAndCiteies(@Query('query') query: string) {
        return this.placesService.searchPlacesAndCiteies(query);
    }
    @Get("/membershipPlaces")
    getMembershipPlaces(): Promise<Place[]> {
        return this.placesService.getMembershipPlaces();
    }

    @Get('/getTopVisitedPlaces')
    getTopVisitedPlaces() {
        return this.placesService.getTopVisitedPlaces();
    }

    @Get("/:id")
    getPlaceById(@Param('id') id: number): Promise<Place> {
        return this.placesService.getPlaceById(id);
    }

    @Put('/:id')
    editPlaceById(@Param('id') id: number, @Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
        return this.placesService.editPlaceById(id, createPlaceDto);
    }

    @Post('')
    @UsePipes(ValidationPipe)
    addPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
        return this.placesService.addPlace(createPlaceDto);
    }


    @Delete('/:id')
    deletePlaceById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.placesService.deletePlaceById(id);
    }

    @Get('/getReservations/:id')
    getPlaceReservations(@Param('id') id: number): Promise<Reservation[]> {
        return this.placesService.getPlaceReservations(id);
    }

    @Get('/getPlaceReviews/:id')
    getPlaceReviews(@Param('id') id: number, @Query('offset') offset: number, @Query('limit') limit: number,) {
        return this.placesService.getPlaceReviews(id, offset, limit);
    }

    @Get('/getPlaceReservationTypes/:id')
    getPlaceReservationTypes(@Param('id') id: number) {
        return this.placesService.getPlaceReservationTypes(id);
    }
}
