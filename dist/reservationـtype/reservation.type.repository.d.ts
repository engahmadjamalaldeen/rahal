import { AmenityRepository } from "src/amenities/amenities.repository";
import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateReservationTypeDto } from "./dto/create-reservation-type-dto";
import { ReservationType } from "./reservationـtype.entity";
export declare class ReservationTypeRepository extends Repository<ReservationType> {
    addReservationType(createReservationTypeDto: CreateReservationTypeDto, placeRepository: PlaceRepository, amenityRepository: AmenityRepository): Promise<ReservationType>;
}
