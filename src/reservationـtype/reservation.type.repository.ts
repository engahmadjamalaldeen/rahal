import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { AmenityRepository } from "src/amenities/amenities.repository";
import { CustomerRepository } from "src/customers/customer.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { PlaceType } from "src/places/dto/create-place-dto";
import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateReservationTypeDto, PriceType } from "./dto/create-reservation-type-dto";
import { ReservationType } from "./reservationـtype.entity";

@CustomRepository(ReservationType)
export class ReservationTypeRepository extends Repository<ReservationType> {
    async addReservationType(createReservationTypeDto: CreateReservationTypeDto, placeRepository: PlaceRepository, amenityRepository: AmenityRepository): Promise<ReservationType> {
        const { name, description, price, priceType, placeId, amenityIds } = createReservationTypeDto;
        
        const reservationType = new ReservationType();
        reservationType.name = name;
        reservationType.description = description;
        reservationType.price = price;
        const place = await placeRepository.findOne({ where: { id: placeId } });
        
        if (place) {
            reservationType.placeId = placeId;
        }
        else {
            throw new NotFoundException("Place Id not found");
        }


        if(Object.values(PriceType).includes(priceType)){
            reservationType.priceType = priceType;
        }
        else{
            throw new ForbiddenException('Price type should be {PERNIGHT, PERHOUR}');
        }

        reservationType.amenities = [];
        if(amenityIds !== undefined){
            for(let i = 0; i < amenityIds.length; i++){
                let amenity = await amenityRepository.findOne({ where: { id: amenityIds[i] } });
                if(amenity){
                    reservationType.amenities.push(amenity);
                }
                else {
                    throw new NotFoundException(`Amenity Id: ${amenity.id} not found`);
                }
            }
        }

        await this.save(reservationType);

        return reservationType;
    }
}