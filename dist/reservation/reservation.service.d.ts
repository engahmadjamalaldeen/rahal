import { CityRepository } from 'src/cities/city.repository';
import { CustomerRepository } from 'src/customers/customer.repository';
import { Gender, Status } from 'src/customers/dto/create-customer-dto';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { CreateClientReservationDto, Operation } from './dto/create-client-reservation-dto';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { Reservation } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';
export declare class ReservationService {
    private reservationRepository;
    private placeRepository;
    private customerRepository;
    private roomRepository;
    private reservationTypeRepository;
    private cityRepository;
    constructor(reservationRepository: ReservationRepository, placeRepository: PlaceRepository, customerRepository: CustomerRepository, roomRepository: RoomRepository, reservationTypeRepository: ReservationTypeRepository, cityRepository: CityRepository);
    getReservations(): Promise<Reservation[]>;
    getReservationsByFilters(roomId: number, reservationTypeId: number, fromDate: string, toDate: string): Promise<{
        reservationsBasedOnReservationTyp: any[];
    } | {
        reservationsBasedOnRoom: any[];
    }>;
    addReservation(createReservationDto: CreateReservationDto): Promise<Reservation>;
    changeReservationStatus(createReservationDto: CreateReservationDto, id: number): Promise<Reservation>;
    clientAddReservation(createClientReservationDto: CreateClientReservationDto): Promise<Reservation>;
    getReservationById(id: number): Promise<Reservation>;
    deleteReservationById(id: number): Promise<boolean>;
    getReservationByPlaceId(placeId: number): Promise<Reservation[]>;
    getReservationByCustomerId(customerId: number): Promise<Reservation[]>;
    getPlaceIncome(placeId: number, fromDate: string, toDate: string): Promise<any[]>;
    getreservationByInterests(placeId: number): Promise<any[]>;
    getreservationByCities(placeId: number): Promise<any[]>;
    getreservationByReservationsTypes(placeId: number): Promise<any[]>;
    reservationByFilters(placeId: number, numOfKids: number, gender: Gender, status: Status, numOfKidsOpe: Operation): Promise<any>;
    addDays(date: Date, days: number): Date;
    formatDateToString(date: Date): string;
    getOperation(numOfKidsOpe: Operation): "customer.numOfKids > :numOfKids" | "customer.numOfKids >= :numOfKids" | "customer.numOfKids = :numOfKids" | "customer.numOfKids <= :numOfKids";
}
