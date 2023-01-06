import { Gender, Status } from 'src/customers/dto/create-customer-dto';
import { CreateClientReservationDto, Operation } from './dto/create-client-reservation-dto';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
export declare class ReservationController {
    private reservationService;
    constructor(reservationService: ReservationService);
    getReservation(): Promise<Reservation[]>;
    getReservationsByFilters(roomId: number, reservationTypeId: number, fromDate: string, toDate: string): Promise<{
        reservationsBasedOnReservationTyp: any[];
    } | {
        reservationsBasedOnRoom: any[];
    }>;
    getPlaceIncome(placeId: number, fromDate: string, toDate: string): Promise<any[] | {
        total: number;
        sub: any[];
    }>;
    getreservationByInterests(placeId: number): Promise<{
        total: number;
        sub: any[];
    }>;
    getreservationByCities(placeId: number): Promise<any[]>;
    getreservationByReservationsTypes(placeId: number): Promise<any[]>;
    reservationByFilters(placeId: number, numOfKids: number, gender: Gender, status: Status, numOfKidsOpe: Operation): Promise<any>;
    addReservation(createReservationDto: CreateReservationDto): Promise<Reservation>;
    clientAddReservation(createClientReservationDto: CreateClientReservationDto): Promise<Reservation>;
    changeReservationStatus(createReservationDto: CreateReservationDto, id: number): Promise<Reservation>;
    getReservationById(id: number): Promise<Reservation>;
    deleteReservationById(id: number): Promise<boolean>;
    getReservationByPlaceId(placeId: number): Promise<Reservation[]>;
    getReservationByCustomerId(customerId: number): Promise<Reservation[]>;
}
