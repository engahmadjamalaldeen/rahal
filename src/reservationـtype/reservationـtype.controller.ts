import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/helpers/roles.decorator';
import RoleGuard from 'src/helpers/roles.guard';
import { Role } from 'src/membership-user/dto/create-membership-user-dto';
import { GetMembership } from 'src/membership-user/helpers/get-membership.decorator';
import { MembershipUser } from 'src/membership-user/membership-user.entity';
import { CreateReservationTypeDto } from './dto/create-reservation-type-dto';
import { ReservationType } from './reservationـtype.entity';
import { ReservationTypeService } from './reservationـtype.service';

@Controller('reservationType')
@UseGuards(RoleGuard(Role.ADMIN))
@UseGuards(AuthGuard())
export class ReservationTypeController {
    constructor(private reservationTypeService: ReservationTypeService){}


    @Get('')
    getReservation(): Promise<ReservationType[]> {
        return this.reservationTypeService.getReservationTypes();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addReservation(@Body() createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType> {
        return this.reservationTypeService.addReservationType(createReservationTypeDto);
    }

    @Get('/:id')
    getReservationById(@Param('id', ParseIntPipe) id: number): Promise<ReservationType> {
        return this.reservationTypeService.getReservationTypeById(id);
    }

    @Put('/:id')
    editReservationTypeById(@Param('id', ParseIntPipe) id: number, @Body() createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType> {
        return this.reservationTypeService.editReservationTypeById(id, createReservationTypeDto);
    }

    @Delete('/:id')
    deleteReservationTypeById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.reservationTypeService.deleteReservationTypeById(id);
    }

    @Get('/getByPlace/:placeId')
    getReservationByPlaceId(@Param('placeId', ParseIntPipe) placeId: number): Promise<ReservationType[]> {
        return this.reservationTypeService.getReservationTypesByPlaceId(placeId);
    }

    @Get('/getReservationTypeReservations/:id')
    getReservationTypeReservations(@Param('id', ParseIntPipe) id: number){
        return this.reservationTypeService.getReservationTypeReservations(id);
    }
    
}
