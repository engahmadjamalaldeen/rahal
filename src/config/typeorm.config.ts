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
    url: 'postgresql://postgres:jBFQY3QZbBQth47HBnDX@containers-us-west-122.railway.app:5941/railway',
    type: 'postgres',
    host: 'containers-us-west-122.railway.app',
    port: 5941,
    username: 'postgres',
    password: 'jBFQY3QZbBQth47HBnDX',
    database: 'railway',
    entities: [City, Blog, CityImage, Customer, Membership, Place, Trip, Reservation, ReservationType, Amenity, Review, Interest, Category, Room, MembershipUser],
    synchronize: true
}