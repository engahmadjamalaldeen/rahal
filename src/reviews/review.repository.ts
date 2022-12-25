import { NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "src/customers/customer.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { PlaceRepository } from "src/places/place.repository";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review-dto";
import { Review } from "./review.entity";

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {
    async addReview(createReviewDto: CreateReviewDto, placeRepository: PlaceRepository, customRepository: CustomerRepository): Promise<Review> {
        const { customerId, placeId, reviewMark, reviewText } = createReviewDto;
        
        const review = new Review();
        review.reviewMark = reviewMark;
        review.reviewText = reviewText;

        const place = await placeRepository.findOne({ where: { id: placeId } });
        if(place){
            review.place = place;
        }
        else {
            throw new NotFoundException("Place Id not found");
        }

        const customer = await customRepository.findOne({ where: { id: customerId } });
        if(customer){
            review.customer = customer;

            delete review.customer.accessToken;
            delete review.customer.password;
            delete review.customer.salt;
        }
        else {
            throw new NotFoundException("Customer Id not found");
        }

        this.save(review);

        return review;
    }
}