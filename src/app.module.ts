import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { typeOrmConfig } from './config/typeorm.config';
import { typeOrmLocalConfig } from './config/typeorm.local.config';
import { PlacesModule } from './places/places.module';
import { MembershipsModule } from './memberships/memberships.module';
import { CustomersModule } from './customers/customers.module';
import { TripsModule } from './trips/trips.module';
import { BlogsModule } from './blogs/blogs.module';
import { CityImagesModule } from './city_images/city.images.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationTypeModule } from './reservationـtype/reservationـtype.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { ReviewsModule } from './reviews/reviews.module';
import { InterestsModule } from './interests/interests.module';
import { CategoriesModule } from './categories/categories.module';
import { RoomsModule } from './rooms/rooms.module';
import { MembershipUserModule } from './membership-user/membership-user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmLocalConfig),
    CitiesModule,
    PlacesModule,
    MembershipsModule,
    CustomersModule,
    TripsModule,
    BlogsModule,
    CityImagesModule,
    ReservationModule,
    ReservationTypeModule,
    AmenitiesModule,
    ReviewsModule,
    InterestsModule,
    CategoriesModule,
    RoomsModule,
    MembershipUserModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
