"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmLocalConfig = void 0;
const blog_entity_1 = require("../blogs/blog.entity");
const city_entity_1 = require("../cities/city.entity");
const city_image_entity_1 = require("../city_images/city_image.entity");
const customer_entity_1 = require("../customers/customer.entity");
const membership_entity_1 = require("../memberships/membership.entity");
const place_entity_1 = require("../places/place.entity");
const trip_entity_1 = require("../trips/trip.entity");
const reservation_entity_1 = require("../reservation/reservation.entity");
const reservation_type_entity_1 = require("../reservation\u0640type/reservation\u0640type.entity");
const amenities_entity_1 = require("../amenities/amenities.entity");
const review_entity_1 = require("../reviews/review.entity");
const interest_entity_1 = require("../interests/interest.entity");
const category_entity_1 = require("../categories/category.entity");
const room_entity_1 = require("../rooms/room.entity");
const membership_user_entity_1 = require("../membership-user/membership-user.entity");
exports.typeOrmLocalConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ahmad',
    database: 'rahal',
    entities: [city_entity_1.City, blog_entity_1.Blog, city_image_entity_1.CityImage, customer_entity_1.Customer, membership_entity_1.Membership, place_entity_1.Place, trip_entity_1.Trip, reservation_entity_1.Reservation, reservation_type_entity_1.ReservationType, amenities_entity_1.Amenity, review_entity_1.Review, interest_entity_1.Interest, category_entity_1.Category, room_entity_1.Room, membership_user_entity_1.MembershipUser],
    synchronize: true
};
//# sourceMappingURL=typeorm.local.config.js.map