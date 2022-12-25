import { CityRepository } from "src/cities/city.repository";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto } from "./dto/create-customer-dto";
import { SignInCustomerDto } from "./dto/signin-customer-dto";
import { PlaceRepository } from "src/places/place.repository";
import { BlogRepository } from "src/blogs/blog.repository";
import { InterestRepository } from "src/interests/interest.repository";
import { CategoryRepository } from "src/categories/category.repository";
import { ReservationRepository } from 'src/reservation/reservation.repository';
export declare class CustomerRepository extends Repository<Customer> {
    addCustomer(createCustomerDto: CreateCustomerDto, cityRepository: CityRepository, interestRepository: InterestRepository): Promise<Customer>;
    validatePassword(signInCustomerDto: SignInCustomerDto): Promise<Customer>;
    private hashPassword;
    getHomePage(id: number, reservationRepository: ReservationRepository, cityRepository: CityRepository, placeRepository: PlaceRepository, blogRepository: BlogRepository, categoryRepository: CategoryRepository): Promise<{
        customer: Customer[];
        cities: import("../cities/city.entity").City[];
        places: import("../places/place.entity").Place[];
        categories: import("../categories/category.entity").Category[];
        blogs: import("../blogs/blog.entity").Blog[];
    }>;
}
