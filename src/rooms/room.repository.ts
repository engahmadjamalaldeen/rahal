import { NotFoundException } from "@nestjs/common";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./dto/create-room-dto";
import { Room } from "./room.entity";

@CustomRepository(Room)
export class RoomRepository extends Repository<Room> {
    async addRoom(createRoomDto: CreateRoomDto, reservationTypeRepository: ReservationTypeRepository): Promise<Room> {
        const { name, reservationTypeId } = createRoomDto;
        
        const room = new Room();
        room.name = name;
        const found = await reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        if(found){
            room.reservationType = found;
            await this.save(room);
        }
        else {
            throw new NotFoundException("Reservation Type Id not found");
        }

        return room;
    }
}