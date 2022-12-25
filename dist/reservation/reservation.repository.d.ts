import { CustomerRepository } from "src/customers/customer.repository";
import { PlaceRepository } from "src/places/place.repository";
import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { RoomRepository } from "src/rooms/room.repository";
import { Repository } from "typeorm";
import { CreateClientReservationDto } from "./dto/create-client-reservation-dto";
import { CreateReservationDto } from "./dto/create-reservation-dto";
import { Reservation } from "./reservation.entity";
export declare class ReservationRepository extends Repository<Reservation> {
    addReservation(createReservationDto: CreateReservationDto, placeRepository: PlaceRepository, customerRepository: CustomerRepository, roomRepository: RoomRepository): Promise<Reservation>;
    clientAddReservation(createClientReservationDto: CreateClientReservationDto, placeRepository: PlaceRepository, customerRepository: CustomerRepository, reservationTypeRepository: ReservationTypeRepository): Promise<Reservation>;
}
