import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room-dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomService: RoomsService){}


    @Get('')
    getRooms(@Query('name') name: string): Promise<Room[]> {
        return this.roomService.getRooms(name);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomService.addRoom(createRoomDto);
    }
    
    @Put('/:id')
    editRoomById(@Param('id') id: number, @Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomService.editRoomById(id, createRoomDto);
    }

    @Delete('/:id')
    deleteRoomById(@Param('id') id: number) {
        return this.roomService.deleteRoomById(id);
    }

    @Get('/getRoomsByReservationType?')
    getRoomsByReservationTypeId(@Query('reservationTypeId') reservationTypeId: number): Promise<Room[]> {
        return this.roomService.getRoomsByReservationTypeId(reservationTypeId);
    }

    @Get('/getRoomsByPlace?')
    getRoomsByPlaceId(@Query('placeId') placeId: number): Promise<Room[]> {
        return this.roomService.getRoomsByPlaceId(placeId);
    }

    @Get('/:id')
    getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
        return this.roomService.getRoomById(id);
    }
}
