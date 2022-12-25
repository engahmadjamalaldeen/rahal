import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { AmenitiesController } from './amenities.controller';
import { AmenityRepository } from './amenities.repository';
import { AmenitiesService } from './amenities.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AmenityRepository, ReservationTypeRepository]),
  ],
  controllers: [AmenitiesController],
  providers: [AmenitiesService]
})
export class AmenitiesModule {}
