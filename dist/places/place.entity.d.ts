import { City } from "src/cities/city.entity";
import { Interest } from "src/interests/interest.entity";
import { Membership } from "src/memberships/membership.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { Review } from "src/reviews/review.entity";
import { BaseEntity } from "typeorm";
import { PlaceType } from "./dto/create-place-dto";
export declare class Place extends BaseEntity {
    id: number;
    name: string;
    price: string;
    description: string;
    type: PlaceType;
    city: City;
    isMembership: boolean;
    membership: Membership;
    reservations: Reservation[];
    reservationsTypes: ReservationType[];
    tags: Interest[];
    reviews: Review[];
    reviewsMark: number;
    numOfReservations: number;
    setComputed(): void;
}
