import { Amenity } from './amenities.entity';
import { AmenitiesService } from './amenities.service';
import { AddAmenitiesToReservationType } from './dto/add-amenities-to-reservation-type-dto';
import { CreateAmenityDto } from './dto/create-amenitie-dto';
export declare class AmenitiesController {
    private amenitiesService;
    constructor(amenitiesService: AmenitiesService);
    getAmenities(): Promise<Amenity[]>;
    addAmenity(createAmenityDto: CreateAmenityDto): Promise<Amenity>;
    getAmenityById(id: number): Promise<Amenity>;
    addAmenitiesToReservationType(addAmenitiesToReservationType: AddAmenitiesToReservationType): Promise<import("../reservation\u0640type/reservation\u0640type.entity").ReservationType>;
    editAmenityById(id: number, createAmenityDto: CreateAmenityDto): Promise<Amenity>;
    deleteAmenityById(id: number): Promise<boolean>;
}
