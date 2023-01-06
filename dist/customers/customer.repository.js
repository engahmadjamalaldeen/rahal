"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const create_customer_dto_1 = require("./dto/create-customer-dto");
const bcrypt = require("bcrypt");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    async addCustomer(createCustomerDto, cityRepository, interestRepository) {
        const { phone, fullName, password, email, cityId, gender, status, numOfKids, interests } = createCustomerDto;
        const salt = await bcrypt.genSalt();
        const customer = new customer_entity_1.Customer();
        customer.phone = phone;
        customer.fullName = fullName;
        customer.password = await this.hashPassword(password, salt);
        customer.salt = salt;
        customer.email = email;
        customer.numOfKids = numOfKids;
        const found = await cityRepository.findOne({ where: { id: cityId } });
        if (found) {
            customer.cityId = cityId;
        }
        else {
            throw new common_1.NotFoundException("City Id not found");
        }
        if (Object.values(create_customer_dto_1.Gender).includes(gender)) {
            customer.gender = gender;
        }
        else {
            throw new common_1.ForbiddenException('Customer gender should be {MALE, FEMALE}');
        }
        if (Object.values(create_customer_dto_1.Status).includes(status)) {
            customer.status = status;
        }
        else {
            throw new common_1.ForbiddenException('Customer status should be {MARRIED, SINGLE}');
        }
        customer.interests = [];
        for (let i = 0; i < interests.length; i++) {
            let interest = await interestRepository.findOne({ where: { id: interests[i] } });
            if (interest) {
                customer.interests.push(interest);
            }
            else {
                throw new common_1.NotFoundException("Interest Id not found");
            }
        }
        return customer;
    }
    async updateCustomer(createCustomerDto, cityRepository, interestRepository) {
        const { id, phone, fullName, password, email, cityId, gender, status, numOfKids, interests } = createCustomerDto;
        const customer = await this.findOne({ where: { id: id } });
        ;
        if (phone) {
            if (customer.phone != phone) {
                customer.phone = phone;
            }
        }
        if (fullName) {
            customer.fullName = fullName;
        }
        if (email) {
            customer.email = email;
        }
        if (numOfKids) {
            customer.numOfKids = numOfKids;
        }
        if (cityId) {
            const found = await cityRepository.findOne({ where: { id: cityId } });
            if (found) {
                customer.cityId = cityId;
            }
            else {
                throw new common_1.NotFoundException("City Id not found");
            }
        }
        if (gender) {
            if (Object.values(create_customer_dto_1.Gender).includes(gender)) {
                customer.gender = gender;
            }
            else {
                throw new common_1.ForbiddenException('Customer gender should be {MALE, FEMALE}');
            }
        }
        if (status) {
            if (Object.values(create_customer_dto_1.Status).includes(status)) {
                customer.status = status;
            }
            else {
                throw new common_1.ForbiddenException('Customer status should be {MARRIED, SINGLE}');
            }
        }
        if (interests) {
            customer.interests = [];
            for (let i = 0; i < interests.length; i++) {
                let interest = await interestRepository.findOne({ where: { id: interests[i] } });
                if (interest) {
                    customer.interests.push(interest);
                }
                else {
                    throw new common_1.NotFoundException("Interest Id not found");
                }
            }
        }
        return customer;
    }
    async validatePassword(signInCustomerDto) {
        const { phone, password } = signInCustomerDto;
        const user = await this.findOne({ where: { phone: phone } });
        if (user && await user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async getHomePage(id, reservationRepository, cityRepository, placeRepository, blogRepository, categoryRepository) {
        const customer = await this.createQueryBuilder("Customer")
            .leftJoinAndSelect('Customer.reservations', 'reservation')
            .leftJoinAndSelect('reservation.place', 'place')
            .leftJoinAndSelect('reservation.room', 'room')
            .where({ id: id })
            .getMany();
        for (let i = 0; i < customer.length; i++) {
            delete customer[i].salt;
            delete customer[i].password;
        }
        const cities = await cityRepository.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images')
            .take(4).getMany();
        for (let i = 0; i < cities.length; i++) {
            delete cities[i].customers;
            delete cities[i].places;
            delete cities[i].blogs;
        }
        const places = await placeRepository.createQueryBuilder('Place')
            .leftJoinAndSelect('Place.city', 'city')
            .leftJoinAndSelect('Place.reservations', 'reservations')
            .leftJoinAndSelect('city.customers', 'customers')
            .leftJoinAndSelect('city.places', 'places')
            .leftJoinAndSelect('city.blogs', 'blogs')
            .take(4).getMany();
        for (let i = 0; i < places.length; i++) {
            delete places[i].city.customers;
            delete places[i].city.places;
            delete places[i].city.blogs;
        }
        const blogs = await blogRepository.find({ take: 4 });
        const categories = await categoryRepository.find({ where: { isActive: true } });
        var map = {
            'customer': customer,
            'cities': cities,
            'places': places,
            'categories': categories,
            'blogs': blogs
        };
        return map;
    }
};
CustomerRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(customer_entity_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map