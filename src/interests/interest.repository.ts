import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Repository } from "typeorm";
import { CreateInterestDto } from "./dto/create-interest-dto";
import { Interest } from "./interest.entity";

@CustomRepository(Interest)
export class InterestRepository extends Repository<Interest> {
    async addInterest(createInterestDto: CreateInterestDto): Promise<Interest> {
        const { name, image } = createInterestDto;
        
        const interest = new Interest();
        interest.name = name;
        interest.image = image;
        // const found = await reservationTypeRepository.findOne({ where: { id: reservationTypeId } });
        // if(found){
        //     amenity.reservationTypes.push(found);
        //     await this.save(amenity);
        // }
        // else {
        //     throw new NotFoundException("Reservation Type Id not found");
        // }
        await this.save(interest);
        return interest;
    }
}