import { Customer } from "src/customers/customer.entity";
import { PlaceType } from "src/places/dto/create-place-dto";
import { Place } from "src/places/place.entity";
import { Room } from "src/rooms/room.entity";
import { BaseEntity } from "typeorm";
export declare class Reservation extends BaseEntity {
    id: number;
    createdAt: Date;
    placeType: PlaceType;
    fromDate: string;
    toDate: string;
    customer: Customer;
    place: Place;
    room: Room;
    price: number;
    numOfDays: number;
    setComputed(): void;
}
