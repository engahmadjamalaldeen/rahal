import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Gender, Status } from 'src/customers/dto/create-customer-dto';
import { CreateClientReservationDto, Operation } from './dto/create-client-reservation-dto';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService){}


    @Get('')
    getReservation(): Promise<Reservation[]> {
        return this.reservationService.getReservations();
    }

    @Get('/getReservations')
    getReservationsByFilters(@Query('roomId') roomId: number,
        @Query('reservationTypeId') reservationTypeId: number,
        @Query('fromDate') fromDate: string,
        @Query('toDate') toDate: string) {
        return this.reservationService.getReservationsByFilters(roomId, reservationTypeId, fromDate, toDate);
    }

    @Get('/placeIncome')
    getPlaceIncome(@Query('placeId') placeId: number,
        @Query('fromDate') fromDate: string,
        @Query('toDate') toDate: string){
        return this.reservationService.getPlaceIncome(placeId, fromDate, toDate);
    }

    @Get('/reservationByInterests')
    getreservationByInterests(@Query('placeId') placeId: number){
        return this.reservationService.getreservationByInterests(placeId);
    }

    @Get('/getreservationByCities')
    getreservationByCities(@Query('placeId') placeId: number){
        return this.reservationService.getreservationByCities(placeId);
    }

    @Get('/getreservationByReservationsTypes')
    getreservationByReservationsTypes(@Query('placeId') placeId: number){
        return this.reservationService.getreservationByReservationsTypes(placeId);
    }

    @Get('/reservationByFilters')
    reservationByFilters(@Query('placeId') placeId: number, @Query('numOfKids') numOfKids: number,
        @Query('gender') gender: Gender, @Query('status') status: Status,
        @Query('numOfKidsOpe') numOfKidsOpe: Operation){
        return this.reservationService.reservationByFilters(placeId, numOfKids, gender, status, numOfKidsOpe);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addReservation(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
        return this.reservationService.addReservation(createReservationDto);
    }

    @Post('/addReservation')
    @UsePipes(ValidationPipe)
    clientAddReservation(@Body() createClientReservationDto: CreateClientReservationDto): Promise<Reservation> {
        return this.reservationService.clientAddReservation(createClientReservationDto);
    }

    @Get('/:id')
    getReservationById(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
        return this.reservationService.getReservationById(id);
    }

    @Delete('/:id')
    deleteReservationById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.reservationService.deleteReservationById(id);
    }

    @Get('/getByPlace/:placeId')
    getReservationByPlaceId(@Param('placeId', ParseIntPipe) placeId: number): Promise<Reservation[]> {
        return this.reservationService.getReservationByPlaceId(placeId);
    }

    @Get('/getByCustomer/:customerId')
    getReservationByCustomerId(@Param('customerId', ParseIntPipe) customerId: number): Promise<Reservation[]> {
        return this.reservationService.getReservationByCustomerId(customerId);
    }
}
