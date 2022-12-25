import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { BaseEntity } from "typeorm";
export declare class Amenity extends BaseEntity {
    id: number;
    name: string;
    image: string;
    reservationTypes: ReservationType[];
    setComputed(): void;
}
