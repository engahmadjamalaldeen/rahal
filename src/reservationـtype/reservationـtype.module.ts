import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AmenityRepository } from 'src/amenities/amenities.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { ReservationTypeRepository } from './reservation.type.repository';
import { ReservationTypeController } from './reservationـtype.controller';
import { ReservationTypeService } from './reservationـtype.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReservationTypeRepository, PlaceRepository, AmenityRepository, ReservationRepository, RoomRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [ReservationTypeController],
  providers: [ReservationTypeService]
})
export class ReservationTypeModule {}
