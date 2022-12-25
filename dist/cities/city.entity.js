"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const blog_entity_1 = require("../blogs/blog.entity");
const city_image_entity_1 = require("../city_images/city_image.entity");
const customer_entity_1 = require("../customers/customer.entity");
const place_entity_1 = require("../places/place.entity");
const typeorm_1 = require("typeorm");
let City = class City extends typeorm_1.BaseEntity {
    setComputed() {
        if (this.customers !== undefined) {
            this.numOfCustomers = this.customers.length;
        }
        else {
            this.numOfCustomers = 0;
        }
        if (this.places !== undefined) {
            this.numOfPlaces = this.places.length;
        }
        else {
            this.numOfPlaces = 0;
        }
        if (this.blogs !== undefined) {
            this.numOfBlogs = this.blogs.length;
        }
        else {
            this.numOfBlogs = 0;
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], City.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => place_entity_1.Place, place => place.city, { eager: true }),
    __metadata("design:type", Array)
], City.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, customer => customer.cityId),
    __metadata("design:type", Array)
], City.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blog_entity_1.Blog, blog => blog.cityId),
    __metadata("design:type", Array)
], City.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => city_image_entity_1.CityImage, cityImage => cityImage.cityId),
    __metadata("design:type", Array)
], City.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], City.prototype, "setComputed", null);
City = __decorate([
    (0, typeorm_1.Entity)()
], City);
exports.City = City;
//# sourceMappingURL=city.entity.js.map