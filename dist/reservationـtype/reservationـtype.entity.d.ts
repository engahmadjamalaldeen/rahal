import { Amenity } from "src/amenities/amenities.entity";
import { Room } from "src/rooms/room.entity";
import { BaseEntity } from "typeorm";
import { PriceType } from "./dto/create-reservation-type-dto";
export declare class ReservationType extends BaseEntity {
    id: number;
    name: string;
    description: string;
    nameAR: string;
    descriptionAR: string;
    price: number;
    usdPrice: number;
    priceType: PriceType;
    rooms: Room[];
    placeId: number;
    amenities: Amenity[];
    setComputed(): void;
}
