"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cities_module_1 = require("./cities/cities.module");
const typeorm_local_config_1 = require("./config/typeorm.local.config");
const places_module_1 = require("./places/places.module");
const memberships_module_1 = require("./memberships/memberships.module");
const customers_module_1 = require("./customers/customers.module");
const trips_module_1 = require("./trips/trips.module");
const blogs_module_1 = require("./blogs/blogs.module");
const city_images_module_1 = require("./city_images/city.images.module");
const reservation_module_1 = require("./reservation/reservation.module");
const reservation_type_module_1 = require("./reservation\u0640type/reservation\u0640type.module");
const amenities_module_1 = require("./amenities/amenities.module");
const reviews_module_1 = require("./reviews/reviews.module");
const interests_module_1 = require("./interests/interests.module");
const categories_module_1 = require("./categories/categories.module");
const rooms_module_1 = require("./rooms/rooms.module");
const membership_user_module_1 = require("./membership-user/membership-user.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_local_config_1.typeOrmLocalConfig),
            cities_module_1.CitiesModule,
            places_module_1.PlacesModule,
            memberships_module_1.MembershipsModule,
            customers_module_1.CustomersModule,
            trips_module_1.TripsModule,
            blogs_module_1.BlogsModule,
            city_images_module_1.CityImagesModule,
            reservation_module_1.ReservationModule,
            reservation_type_module_1.ReservationTypeModule,
            amenities_module_1.AmenitiesModule,
            reviews_module_1.ReviewsModule,
            interests_module_1.InterestsModule,
            categories_module_1.CategoriesModule,
            rooms_module_1.RoomsModule,
            membership_user_module_1.MembershipUserModule,
            config_1.ConfigModule.forRoot()
        ],
        controllers: [],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map