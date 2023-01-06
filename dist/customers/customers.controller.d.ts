import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { SignInCustomerDto } from './dto/signin-customer-dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    getCustomers(): Promise<Customer[]>;
    getHomePage(id: number): Promise<{
        customer: Customer[];
        cities: import("../cities/city.entity").City[];
        places: import("../places/place.entity").Place[];
        categories: import("../categories/category.entity").Category[];
        blogs: import("../blogs/blog.entity").Blog[];
    }>;
    addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    updateCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    signIn(signInCustomerDto: SignInCustomerDto): Promise<Customer>;
    getCustomerById(id: number): Promise<{
        customer: Customer;
        city: import("../cities/city.entity").City;
    }>;
    getCustomerByPhone(phone: string): Promise<Customer>;
    getCustomerReviews(id: number): Promise<import("../reviews/review.entity").Review[]>;
    getCustomerInterests(id: number): Promise<import("../interests/interest.entity").Interest[]>;
}
