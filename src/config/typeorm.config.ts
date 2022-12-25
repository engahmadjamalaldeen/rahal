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
    url: 'postgresql://dTghyKAULiEmagxnakRJPbklQWYDEdwY:TiuTlXxiwxTjcAYxMzXyEhmXlOZpTHwp@db.thin.dev/f050b5c7-f16f-419f-85fc-1f69e1a3e80d',
    type: 'postgres',
    host: 'db.thin.dev',
    port: 5941,
    username: 'dTghyKAULiEmagxnakRJPbklQWYDEdwY',
    password: 'TiuTlXxiwxTjcAYxMzXyEhmXlOZpTHwp',
    database: 'f050b5c7-f16f-419f-85fc-1f69e1a3e80d',
    entities: [City, Blog, CityImage, Customer, Membership, Place, Trip, Reservation, ReservationType, Amenity, Review, Interest, Category, Room, MembershipUser],
    synchronize: true
}