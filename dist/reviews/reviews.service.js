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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const process_1 = require("process");
const customer_repository_1 = require("../customers/customer.repository");
const place_repository_1 = require("../places/place.repository");
const review_repository_1 = require("./review.repository");
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, customerRepository, placeRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
        this.placeRepository = placeRepository;
    }
    async getReviews(offset, limit) {
        const found = await this.reviewRepository.createQueryBuilder('Review').
            leftJoinAndSelect('Review.place', 'place')
            .leftJoinAndSelect('Review.customer', 'customer')
            .take(offset)
            .skip(limit)
            .getMany();
        let prev = limit - 10;
        let next = +limit + 10;
        if (prev < 0) {
            prev = 0;
        }
        for (let i = 0; i < found.length; i++) {
            delete found[i].customer.accessToken;
            delete found[i].customer.salt;
            delete found[i].customer.password;
        }
        var map = {
            'reviews': found,
            'prev': process_1.env.APP_URL + "reviews?offset=" + (10) + "&limit=" + prev,
            'next': process_1.env.APP_URL + "reviews?offset=" + (10) + "&limit=" + next,
        };
        return map;
    }
    async addReview(createReviewDto) {
        return this.reviewRepository.addReview(createReviewDto, this.placeRepository, this.customerRepository);
    }
    async getReviewById(id) {
        const found = await this.reviewRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return found;
    }
    async deleteReview(id) {
        const deleted = await this.reviewRepository.delete({ id: id });
        if (deleted)
            return true;
        else
            return false;
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_repository_1.ReviewRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_repository_1.CustomerRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(place_repository_1.PlaceRepository)),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        customer_repository_1.CustomerRepository,
        place_repository_1.PlaceRepository])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map