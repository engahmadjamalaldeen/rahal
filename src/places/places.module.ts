import { Module } from '@nestjs/common';
import { CityRepository } from 'src/cities/city.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { InterestRepository } from 'src/interests/interest.repository';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { PlaceRepository } from './place.repository';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PlaceRepository, MembershipRepository, ReviewRepository, InterestRepository, ReservationTypeRepository, CityRepository]),
  ],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
