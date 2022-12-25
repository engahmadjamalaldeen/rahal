import { CustomerRepository } from "src/customers/customer.repository";
import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review-dto";
import { Review } from "./review.entity";
export declare class ReviewRepository extends Repository<Review> {
    addReview(createReviewDto: CreateReviewDto, placeRepository: PlaceRepository, customRepository: CustomerRepository): Promise<Review>;
}
