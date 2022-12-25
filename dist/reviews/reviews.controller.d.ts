import { CreateReviewDto } from './dto/create-review-dto';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviews(offset: number, limit: number): Promise<{
        reviews: Review[];
        prev: string;
        next: string;
    }>;
    addReview(createReviewDto: CreateReviewDto): Promise<Review>;
    getReviewById(id: number): Promise<Review>;
    deleteReview(id: number): Promise<boolean>;
}
