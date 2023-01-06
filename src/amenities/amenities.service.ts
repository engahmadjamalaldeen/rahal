import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { Amenity } from './amenities.entity';
import { AmenityRepository } from './amenities.repository';
import { AddAmenitiesToReservationType } from './dto/add-amenities-to-reservation-type-dto';
import { CreateAmenityDto } from './dto/create-amenitie-dto';

@Injectable()
export class AmenitiesService {
    constructor(
        @InjectRepository(AmenityRepository)
        private amenityRepository: AmenityRepository,
        @InjectRepository(ReservationTypeRepository)
        private reservationTypeRepository: ReservationTypeRepository
    ) { }


    async getAmenities(): Promise<Amenity[]> {
        const found = await this.amenityRepository.find();

        return found;
    }

    async addAmenity(createAmenityDto: CreateAmenityDto): Promise<Amenity> {
        return this.amenityRepository.addAmenity(createAmenityDto, this.reservationTypeRepository);
    }

    async getAmenityById(id: number): Promise<Amenity> {
        const found = await this.amenityRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Amenity with ID ${id} not found`);
        }

        return found;
    }

    async editAmenityById(id: number, createAmenityDto: CreateAmenityDto): Promise<Amenity> {
        const { name, nameAR, image } = createAmenityDto;
        let found = await this.amenityRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Amenity with ID ${id} not found`);
        }

        const updated = await this.amenityRepository.createQueryBuilder()
            .update(found)
            .set({ name: name, nameAR: nameAR, image: image })
            .where("id = :id", { id: found.id })
            .execute();
            
        found = await this.amenityRepository.findOne({ where: { id: id } });

        return found;
    }

    async deleteAmenityById(id: number): Promise<boolean> {
        const found = await this.amenityRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Amenity with ID ${id} not found`);
        }

        this.amenityRepository.remove(found);
        return true;
    }

    async addAmenitiesToReservationType(addAmenitiesToReservationType: AddAmenitiesToReservationType) {
        const { reservationTypeId, amenitiesIds } = addAmenitiesToReservationType;
        const reservationType = await this.reservationTypeRepository.findOne({where: {id: reservationTypeId}});
        for(let i = 0; i < amenitiesIds.length; i++){
            let found = await this.amenityRepository.findOne({where: {id: amenitiesIds[i]}});
            if(found){
                if(reservationType){
                    if(reservationType.amenities !== undefined){
                        reservationType.amenities.push(found);
                        this.reservationTypeRepository.save(reservationType);
                    }
                    else{
                        reservationType.amenities = [];
                        reservationType.amenities.push(found);
                        this.reservationTypeRepository.save(reservationType);
                    }
                }
                else{
                    throw new NotFoundException("Reservation Type Id not found");
                }
            }
            else{
                throw new NotFoundException("Interests Id not found");
            }
        }
        return reservationType;
    }
}
