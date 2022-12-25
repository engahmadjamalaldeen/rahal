import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { RoomRepository } from './room.repository';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RoomRepository, ReservationTypeRepository, PlaceRepository]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
