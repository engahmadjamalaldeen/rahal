import { AmenityRepository } from 'src/amenities/amenities.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { CreateReservationTypeDto } from './dto/create-reservation-type-dto';
import { ReservationTypeRepository } from './reservation.type.repository';
import { ReservationType } from './reservationـtype.entity';
export declare class ReservationTypeService {
    private reservationTypeRepository;
    private PlaceRepository;
    private amenityRepository;
    private reservationRepository;
    private roomRepository;
    constructor(reservationTypeRepository: ReservationTypeRepository, PlaceRepository: PlaceRepository, amenityRepository: AmenityRepository, reservationRepository: ReservationRepository, roomRepository: RoomRepository);
    getReservationTypes(): Promise<ReservationType[]>;
    addReservationType(createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType>;
    getReservationTypeById(id: number): Promise<ReservationType>;
    editReservationTypeById(id: number, createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType>;
    deleteReservationTypeById(id: number): Promise<boolean>;
    getReservationTypesByPlaceId(placeId: number): Promise<ReservationType[]>;
    getReservationTypeReservations(id: number): Promise<any[]>;
}
