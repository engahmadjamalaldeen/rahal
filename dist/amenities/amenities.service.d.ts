import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { Amenity } from './amenities.entity';
import { AmenityRepository } from './amenities.repository';
import { AddAmenitiesToReservationType } from './dto/add-amenities-to-reservation-type-dto';
import { CreateAmenityDto } from './dto/create-amenitie-dto';
export declare class AmenitiesService {
    private amenityRepository;
    private reservationTypeRepository;
    constructor(amenityRepository: AmenityRepository, reservationTypeRepository: ReservationTypeRepository);
    getAmenities(): Promise<Amenity[]>;
    addAmenity(createAmenityDto: CreateAmenityDto): Promise<Amenity>;
    getAmenityById(id: number): Promise<Amenity>;
    editAmenityById(id: number, createAmenityDto: CreateAmenityDto): Promise<Amenity>;
    deleteAmenityById(id: number): Promise<boolean>;
    addAmenitiesToReservationType(addAmenitiesToReservationType: AddAmenitiesToReservationType): Promise<import("../reservation\u0640type/reservation\u0640type.entity").ReservationType>;
}
