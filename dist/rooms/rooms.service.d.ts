import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { CreateRoomDto } from './dto/create-room-dto';
import { Room } from './room.entity';
import { RoomRepository } from './room.repository';
export declare class RoomsService {
    private roomRepository;
    private reservationTypeRepository;
    private placeRepository;
    constructor(roomRepository: RoomRepository, reservationTypeRepository: ReservationTypeRepository, placeRepository: PlaceRepository);
    getRooms(name: string): Promise<Room[]>;
    addRoom(createRoomDto: CreateRoomDto): Promise<Room>;
    getRoomById(id: number): Promise<Room>;
    editRoomById(id: number, createRoomDto: CreateRoomDto): Promise<Room>;
    deleteRoomById(id: number): Promise<boolean>;
    getRoomsByReservationTypeId(reservationTypeId: number): Promise<Room[]>;
    getRoomsByPlaceId(placeId: number): Promise<Room[]>;
}
