import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Repository } from "typeorm";
import { Amenity } from "./amenities.entity";
import { CreateAmenityDto } from "./dto/create-amenitie-dto";
export declare class AmenityRepository extends Repository<Amenity> {
    addAmenity(createAmenityDto: CreateAmenityDto, reservationTypeRepository: ReservationTypeRepository): Promise<Amenity>;
}
