import { CreateReservationTypeDto } from './dto/create-reservation-type-dto';
import { ReservationType } from './reservationـtype.entity';
import { ReservationTypeService } from './reservationـtype.service';
export declare class ReservationTypeController {
    private reservationTypeService;
    constructor(reservationTypeService: ReservationTypeService);
    getReservation(): Promise<ReservationType[]>;
    addReservation(createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType>;
    getReservationById(id: number): Promise<ReservationType>;
    editReservationTypeById(id: number, createReservationTypeDto: CreateReservationTypeDto): Promise<ReservationType>;
    deleteReservationTypeById(id: number): Promise<boolean>;
    getReservationByPlaceId(placeId: number): Promise<ReservationType[]>;
    getReservationTypeReservations(id: number): Promise<any[]>;
}
