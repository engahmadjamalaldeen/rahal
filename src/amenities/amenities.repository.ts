import { NotFoundException } from "@nestjs/common";
import { CityRepository } from "src/cities/city.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Repository } from "typeorm";
import { Amenity } from "./amenities.entity";
import { CreateAmenityDto } from "./dto/create-amenitie-dto";

@CustomRepository(Amenity)
export class AmenityRepository extends Repository<Amenity> {
    async addAmenity(createAmenityDto: CreateAmenityDto, reservationTypeRepository: ReservationTypeRepository): Promise<Amenity> {
        const { name, nameAR, image } = createAmenityDto;
        
        const amenity = new Amenity();
        amenity.name = name;
        amenity.nameAR = nameAR;
        amenity.image = image;
        // const found = await reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        // if(found){
        //     amenity.reservationTypes.push(found);
        //     await this.save(amenity);
        // }
        // else {
        //     throw new NotFoundException("Reservation Type Id not found");
        // }
        await this.save(amenity);
        return amenity;
    }
}