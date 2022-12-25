import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { CreateRoomDto } from './dto/create-room-dto';
import { Room } from './room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
        @InjectRepository(ReservationTypeRepository)
        private reservationTypeRepository: ReservationTypeRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository
    ) { }


    async getRooms(name: string): Promise<Room[]> {
        // const found = await this.roomRepository.find();
        if(name === undefined){
            console.log("outo " + name);
            const found = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect('Room.reservationType', 'reservationType')
            .leftJoinAndSelect('Room.reservations', 'reservations')
            .getMany();

            return found;
        }
        else{
            console.log("ino " + name);
            const found = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect('Room.reservationType', 'reservationType')
            .leftJoinAndSelect('Room.reservations', 'reservations')
            .where("Room.name = :name", {name : name})
            .getMany();

            return found;
        }

    }

    async addRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomRepository.addRoom(createRoomDto, this.reservationTypeRepository);
    }

    async getRoomById(id: number): Promise<Room> {
        const found = await this.roomRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }

        return found;
    }

    async editRoomById(id: number, createRoomDto: CreateRoomDto): Promise<Room> {
        const { name, reservationTypeId } = createRoomDto;
        let found = await this.roomRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }

        const reservationType = await this.reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        if(!reservationType){
            throw new NotFoundException(`Reservation Type with ID ${id} not found`);
        }

        if(found.reservationType.placeId !== reservationType.placeId){
            throw new ForbiddenException(`Reservation Type ID ${reservationTypeId} is not for the same reservation type ID : ${found.reservationType.id}`);
        }

        const updated = await this.roomRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, reservationType: reservationType })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.roomRepository.findOne({ where: { id: id } });

        return found;
    }

    async deleteRoomById(id: number){
        let found = await this.roomRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }

        let deleted;
        try{
            deleted = await this.roomRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id: found.id })
            .execute();
        }catch(e){
            throw new ForbiddenException(`Room ID: ${id} has reservations`);
        }

        return deleted ? true : false;
    }

    async getRoomsByReservationTypeId(reservationTypeId: number): Promise<Room[]> {
        const reservationType = await this. reservationTypeRepository.findOne({where: {id: reservationTypeId}});
        if(!reservationType)
            throw new NotFoundException(`Reservation type id ${reservationTypeId} not found`)

        const found = await this.roomRepository.createQueryBuilder('Room')
            .where("Room.reservationType.id = :reservationTypeId", {reservationTypeId})
            .getMany();

        return found;
    }

    async getRoomsByPlaceId(placeId: number): Promise<Room[]> {
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place)
            throw new NotFoundException(`Place id: ${placeId} not found`)

        const reservationType = await this.reservationTypeRepository.find({where: {placeId: placeId}});
        if(!reservationType)
            throw new NotFoundException(`There is no rooms for place id: ${placeId}`);

        let found = [];
        for(let i = 0; i < reservationType.length; i++){
            let reservationTypeId = reservationType[i].id;
            found = [...found, ...await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect("Room.reservationType", "reservationType")
            .where("Room.reservationType.id = :reservationTypeId", {reservationTypeId})
            .getMany()]
            // found.concat();
        }

        return found;
    }
}
