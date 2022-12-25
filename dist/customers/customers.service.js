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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const blog_repository_1 = require("../blogs/blog.repository");
const category_repository_1 = require("../categories/category.repository");
const city_repository_1 = require("../cities/city.repository");
const interest_repository_1 = require("../interests/interest.repository");
const place_repository_1 = require("../places/place.repository");
const review_repository_1 = require("../reviews/review.repository");
const customer_entity_1 = require("./customer.entity");
const customer_repository_1 = require("./customer.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
let CustomersService = class CustomersService {
    constructor(reservationRepository, customerRepository, cityRepository, placeRepository, reviewRepository, blogRepository, interestRepository, categoryRepository, jwtService) {
        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
        this.cityRepository = cityRepository;
        this.placeRepository = placeRepository;
        this.reviewRepository = reviewRepository;
        this.blogRepository = blogRepository;
        this.interestRepository = interestRepository;
        this.categoryRepository = categoryRepository;
        this.jwtService = jwtService;
    }
    async getCustomers() {
        const found = await this.customerRepository.createQueryBuilder('Customer').leftJoinAndSelect('Customer.tripsParticipated', 'tripsParticipated').leftJoinAndSelect('Customer.tripsCreated', 'tripsCreated').leftJoinAndSelect('Customer.reservations', 'reservations').leftJoinAndSelect('Customer.interests', 'interests').getMany();
        for (let i = 0; i < found.length; i++) {
            delete found[i].password;
            delete found[i].salt;
            delete found[i].accessToken;
            delete found[i].reservations;
        }
        return found;
    }
    async addCustomer(createCustomerDto) {
        const { phone, fullName, password, email, cityId, gender, status, numOfKids } = createCustomerDto;
        let customer = await this.customerRepository.addCustomer(createCustomerDto, this.cityRepository, this.interestRepository);
        let payload = { phone };
        const accessToken = await this.jwtService.sign(payload);
        customer.accessToken = accessToken;
        try {
            await this.customerRepository.save(customer);
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException("Phone already exists");
            }
            throw new common_1.InternalServerErrorException("Error code:" + e.code);
        }
        delete customer.password;
        delete customer.salt;
        return customer;
    }
    async signIn(signInCustomerDto) {
        let customer = await this.customerRepository.validatePassword(signInCustomerDto);
        if (!customer) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        let phone = customer.phone;
        let payload = { phone };
        const accessToken = await this.jwtService.sign(payload);
        await this.customerRepository.createQueryBuilder()
            .update(customer)
            .set({ accessToken: accessToken })
            .where("id = :id", { id: customer.id })
            .execute();
        customer = await this.customerRepository.validatePassword(signInCustomerDto);
        delete customer.password;
        delete customer.salt;
        return customer;
    }
    async getCustomerById(id) {
        const found = await this.customerRepository.findOne({ where: { id: id },
            relations: ['reservations', 'reservations.place', 'reservations.room', 'tripsCreated', 'interests'] });
        const city = await this.cityRepository.findOne({ where: { id: found.cityId } });
        if (!found) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        delete found.accessToken;
        delete found.password;
        delete found.salt;
        var map = {
            'customer': found,
            'city': city
        };
        return map;
    }
    async getCustomerByPhone(phone) {
        const found = await this.customerRepository.findOne({ where: { phone: phone } });
        if (!found) {
            throw new common_1.NotFoundException(`Customer with phone ${phone} not found`);
        }
        delete found.password;
        delete found.salt;
        return found;
    }
    async getHomePage(id) {
        return this.customerRepository.getHomePage(id, this.reservationRepository, this.cityRepository, this.placeRepository, this.blogRepository, this.categoryRepository);
    }
    async getCustomerReviews(id) {
        const found = await this.customerRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const reviews = await this.reviewRepository.createQueryBuilder('Review').leftJoinAndSelect('Review.place', 'place').where({ customer: found }).getMany();
        return reviews;
    }
    async getCustomerInterests(id) {
        const found = await this.customerRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const customers = await this.customerRepository
            .createQueryBuilder('customer');
        const customerInterests = await this.interestRepository
            .createQueryBuilder('interest')
            .leftJoinAndSelect('interest.customers', 'customers')
            .where(() => {
            const subquery = customers
                .subQuery()
                .select('customer.id').
                from(customer_entity_1.Customer, 'customer')
                .where('customer.id = :id')
                .getQuery();
            return "\"customers\".\"id\" IN " + subquery;
        })
            .setParameter("id", id)
            .getMany();
        for (let i = 0; i < customerInterests.length; i++) {
            delete customerInterests[i].customers;
        }
        return customerInterests;
    }
};
CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_repository_1.ReservationRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_repository_1.CustomerRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(city_repository_1.CityRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(review_repository_1.ReviewRepository)),
    __param(5, (0, typeorm_1.InjectRepository)(blog_repository_1.BlogRepository)),
    __param(6, (0, typeorm_1.InjectRepository)(interest_repository_1.InterestRepository)),
    __param(7, (0, typeorm_1.InjectRepository)(category_repository_1.CategoryRepository)),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository,
        customer_repository_1.CustomerRepository,
        city_repository_1.CityRepository,
        place_repository_1.PlaceRepository,
        review_repository_1.ReviewRepository,
        blog_repository_1.BlogRepository,
        interest_repository_1.InterestRepository,
        category_repository_1.CategoryRepository,
        jwt_1.JwtService])
], CustomersService);
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.service.js.map