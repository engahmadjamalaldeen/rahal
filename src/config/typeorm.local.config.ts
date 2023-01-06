import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
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

export const typeOrmLocalConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ahmad',
    database: 'rahal',
    entities: [City, Blog, CityImage, Customer, Membership, Place, Trip, Reservation, ReservationType, Amenity, Review, Interest, Category, Room, MembershipUser],
    synchronize: true
}