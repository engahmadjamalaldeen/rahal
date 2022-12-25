import { Module } from '@nestjs/common';
import { CityRepository } from 'src/cities/city.repository';
import { CustomerRepository } from 'src/customers/customer.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReservationRepository, PlaceRepository, CustomerRepository, RoomRepository, ReservationTypeRepository, CityRepository]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
