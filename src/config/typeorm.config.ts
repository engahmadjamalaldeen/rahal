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
    url: 'postgresql://kMgsfewTVWmNoheLKGOfFEjKdJCrkTmP:TeIRgmwNozCNDIChupQXEEauyLfnZdCU@db.thin.dev/74e9f583-2706-4114-970c-af3ac38c4845',
    type: 'postgres',
    host: 'db.thin.dev',
    port: 5432,
    username: 'kMgsfewTVWmNoheLKGOfFEjKdJCrkTmP',
    password: 'TeIRgmwNozCNDIChupQXEEauyLfnZdCU',
    database: '74e9f583-2706-4114-970c-af3ac38c4845',
    entities: [City, Blog, CityImage, Customer, Membership, Place, Trip, Reservation, ReservationType, Amenity, Review, Interest, Category, Room, MembershipUser],
    synchronize: true
}