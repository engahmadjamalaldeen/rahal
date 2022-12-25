import { CustomerRepository } from 'src/customers/customer.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { CreateReviewDto } from './dto/create-review-dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
export declare class ReviewsService {
    private reviewRepository;
    private customerRepository;
    private placeRepository;
    constructor(reviewRepository: ReviewRepository, customerRepository: CustomerRepository, placeRepository: PlaceRepository);
    getReviews(offset: number, limit: number): Promise<{
        reviews: Review[];
        prev: string;
        next: string;
    }>;
    addReview(createReviewDto: CreateReviewDto): Promise<Review>;
    getReviewById(id: number): Promise<Review>;
    deleteReview(id: number): Promise<boolean>;
}
