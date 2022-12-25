import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Blog } from "src/blogs/blog.entity";
import { City } from "../cities/city.entity";
import { CityImage } from "src/city_images/city_image.entity";
import { Customer } from "src/customers/customer.entity";
import { Membership } from "src/memberships/membership.entity";
import { Place } from "src/places/place.entity";
import { Trip } from "src/trips/trip.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { Amenity } from "src/amenities/amenities.entity";
import { Review } from "src/reviews/review.entity";
import { Interest } from "src/interests/interest.entity";
import { Category } from "src/categories/category.entity";
import { Room } from "src/rooms/room.entity";
import { MembershipUser } from "src/membership-user/membership-user.entity";

export const typeOrmConfig : TypeOrmModuleOptions = {
    ssl: {
        rejectUnauthorized: false,
      },
      url: 'postgres://vnhaauvcffwinb:4a9df12d227133ed840a05539ab59d5902d0a72e380694f979254c9d412f64e6@ec2-54-155-110-181.eu-west-1.compute.amazonaws.com:5432/d9s9trld8fis1c',
      type: 'postgres',
      host: 'ec2-54-155-110-181.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'vnhaauvcffwinb',
      password: '4a9df12d227133ed840a05539ab59d5902d0a72e380694f979254c9d412f64e6',
      database: 'd9s9trld8fis1c',
    entities: [City, Blog, CityImage, Customer, Membership, Place, Trip, Reservation, ReservationType, Amenity, Review, Interest, Category, Room, MembershipUser],
    synchronize: true
}