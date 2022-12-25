import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmenityRepository } from 'src/amenities/amenities.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { CreateReservationTypeDto } from './dto/create-reservation-type-dto';
import { ReservationTypeRepository } from './reservation.type.repository';
import { ReservationType } from './reservationـtype.entity';

@Injectable()
export class ReservationTypeService {
    constructor(
        @InjectRepository(ReservationTypeRepository)
        private reservationTypeRepository: ReservationTypeRepository,
        @InjectRepository(PlaceRepository)
        private PlaceRepository: PlaceRepository,
        @InjectRepository(AmenityRepository)
        private amenityRepository: AmenityRepository,
        @InjectRepository(ReservationRepository)
        private reservationRepository: ReservationRepository,
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
    ) { }


    async getReservationTypes(): Promise<ReservationType[]> {
        const found = await this.reservationTypeRepository.createQueryBuilder('ReservationType')
            .leftJoinAndSelect('ReservationType.amenities', 'amenities')
            .leftJoinAndSelect('ReservationType.rooms', 'rooms')
            .getMany();

        return found;
    }

    async addReservationType(createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType> {
        return this.reservationTypeRepository.addReservationType(createReservationTypeDto, this.PlaceRepository, this.amenityRepository);
    }

    async getReservationTypeById(id: number): Promise<ReservationType> {
        const found = await this.reservationTypeRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        return found;
    }

    async editReservationTypeById(id: number, createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType> {
        const { name, description, price, priceType, placeId, amenityIds } = createReservationTypeDto;
        let found = await this.reservationTypeRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        found.amenities = [];
        if(amenityIds !== undefined){
            for(let i = 0; i < amenityIds.length; i++){
                let amenity = await this.amenityRepository.findOne({ where: { id: amenityIds[i] } });
                if(amenity){
                    found.amenities.push(amenity);
                }
                else {
                    throw new NotFoundException(`Amenity Id: ${amenityIds[i]} not found`);
                }
            }
        }
        await this.reservationTypeRepository.save(found);

        const updated = await this.reservationTypeRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, description: description, price: price, priceType: priceType })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.reservationTypeRepository.findOne({ where: { id: id } , relations: ['rooms', 'amenities'] });

        return found;
    }

    async deleteReservationTypeById(id: number): Promise<boolean> {
        const found = await this.reservationTypeRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`ReservationType with ID ${id} not found`);
        }
        
        const reservationTypeId = found.id;

        const rooms = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect("Room.reservations", "reservations")
            .where("Room.reservationType.id = :reservationTypeId", {reservationTypeId})
            .getMany();

        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].reservations.length > 0){
                throw new ForbiddenException(`This reservation type have reservations on Room ID: ${rooms[i].id}`);
            }
        }

        let deleted;
        try{
            deleted = await this.reservationTypeRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id: found.id })
            .execute();
        }catch(e){
            throw new ForbiddenException(`Reservation Type ID: ${id} has reservations`);
        }

        return deleted ? true : false;
    }

    async getReservationTypesByPlaceId(placeId: number): Promise<ReservationType[]> {
        const found = await this.reservationTypeRepository.find({ where: { placeId: placeId } });

        if (!found) {
            throw new NotFoundException(`No Reservations Types found for place ID: ${placeId}`);
        }

        return found;
    }

    async getReservationTypeReservations(id: number) {
        const found = await this.reservationTypeRepository.findOne({where: {id: id}});
        if(!found){
            throw new NotFoundException('Reservation Type not found');
        }

        const reservationTypeId = found.id;

        const rooms = await this.roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect("Room.reservations", "reservations")
            .where("Room.reservationType.id = :reservationTypeId", {reservationTypeId})
            .getMany();

        let reservations = [];
        for(let i = 0; i < rooms.length; i++){
            reservations = reservations.concat(rooms[i].reservations);
        }

        return reservations;
    }

}
