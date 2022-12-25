import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./dto/create-room-dto";
import { Room } from "./room.entity";
export declare class RoomRepository extends Repository<Room> {
    addRoom(createRoomDto: CreateRoomDto, reservationTypeRepository: ReservationTypeRepository): Promise<Room>;
}
