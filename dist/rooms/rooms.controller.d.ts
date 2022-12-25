import { CreateRoomDto } from './dto/create-room-dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private roomService;
    constructor(roomService: RoomsService);
    getRooms(name: string): Promise<Room[]>;
    addRoom(createRoomDto: CreateRoomDto): Promise<Room>;
    editRoomById(id: number, createRoomDto: CreateRoomDto): Promise<Room>;
    deleteRoomById(id: number): Promise<boolean>;
    getRoomsByReservationTypeId(reservationTypeId: number): Promise<Room[]>;
    getRoomsByPlaceId(placeId: number): Promise<Room[]>;
    getRoomById(id: number): Promise<Room>;
}
