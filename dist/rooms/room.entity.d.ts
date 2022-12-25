import { Reservation } from "src/reservation/reservation.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { BaseEntity } from "typeorm";
export declare class Room extends BaseEntity {
    id: number;
    name: string;
    reservationType: ReservationType;
    reservations: Reservation[];
}
