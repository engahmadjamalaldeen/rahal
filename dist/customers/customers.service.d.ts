import { JwtService } from '@nestjs/jwt';
import { BlogRepository } from 'src/blogs/blog.repository';
import { CategoryRepository } from 'src/categories/category.repository';
import { CityRepository } from 'src/cities/city.repository';
import { Interest } from 'src/interests/interest.entity';
import { InterestRepository } from 'src/interests/interest.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { SignInCustomerDto } from './dto/signin-customer-dto';
import { ReservationRepository } from 'src/reservation/reservation.repository';
export declare class CustomersService {
    private reservationRepository;
    private customerRepository;
    private cityRepository;
    private placeRepository;
    private reviewRepository;
    private blogRepository;
    private interestRepository;
    private categoryRepository;
    private jwtService;
    constructor(reservationRepository: ReservationRepository, customerRepository: CustomerRepository, cityRepository: CityRepository, placeRepository: PlaceRepository, reviewRepository: ReviewRepository, blogRepository: BlogRepository, interestRepository: InterestRepository, categoryRepository: CategoryRepository, jwtService: JwtService);
    getCustomers(): Promise<Customer[]>;
    addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    signIn(signInCustomerDto: SignInCustomerDto): Promise<Customer>;
    getCustomerById(id: number): Promise<{
        customer: Customer;
        city: import("../cities/city.entity").City;
    }>;
    getCustomerByPhone(phone: string): Promise<Customer>;
    getHomePage(id: number): Promise<{
        customer: Customer[];
        cities: import("../cities/city.entity").City[];
        places: import("../places/place.entity").Place[];
        categories: import("../categories/category.entity").Category[];
        blogs: import("../blogs/blog.entity").Blog[];
    }>;
    getCustomerReviews(id: number): Promise<import("../reviews/review.entity").Review[]>;
    getCustomerInterests(id: number): Promise<Interest[]>;
}
