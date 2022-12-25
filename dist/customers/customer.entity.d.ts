import { BaseEntity } from "typeorm";
import { Gender, Status } from "./dto/create-customer-dto";
import { Trip } from "src/trips/trip.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Review } from "src/reviews/review.entity";
import { Interest } from "src/interests/interest.entity";
export declare class Customer extends BaseEntity {
    id: number;
    accessToken: string;
    phone: string;
    fullName: string;
    password: string;
    salt: string;
    email: string;
    cityId: number;
    gender: Gender;
    status: Status;
    numOfKids: number;
    interests: Interest[];
    reservations: Reservation[];
    tripsCreated: Trip[];
    tripsParticipated: Trip[];
    reviews: Review[];
    numOfTrpisParticipted: number;
    numOfTrpisCreated: number;
    numOfReservations: number;
    setComputed(): void;
    validatePassword(password: string): Promise<boolean>;
}
