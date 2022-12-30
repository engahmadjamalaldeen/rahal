import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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
import { JwtPayload } from './jwt-payload.interface';
import { ReservationRepository } from 'src/reservation/reservation.repository';
@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository: ReservationRepository,
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
        @InjectRepository(CityRepository)
        private cityRepository: CityRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository,
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository,
        @InjectRepository(BlogRepository)
        private blogRepository: BlogRepository,
        @InjectRepository(InterestRepository)
        private interestRepository: InterestRepository,
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
        private jwtService: JwtService
    ) { }


    async getCustomers(): Promise<Customer[]> {
        const found = await this.customerRepository.createQueryBuilder('Customer').leftJoinAndSelect('Customer.tripsParticipated', 'tripsParticipated').leftJoinAndSelect('Customer.tripsCreated', 'tripsCreated').leftJoinAndSelect('Customer.reservations', 'reservations').leftJoinAndSelect('Customer.interests', 'interests').getMany();

        for (let i = 0; i < found.length; i++) {
            delete found[i].password;
            delete found[i].salt;
            delete found[i].accessToken;
            delete found[i].reservations;
        }
    
        return found;
    }

    async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { phone, fullName, password, email, cityId, gender, status, numOfKids } = createCustomerDto;
        let customer = await this.customerRepository.addCustomer(createCustomerDto, this.cityRepository, this.interestRepository);

        let payload: JwtPayload = { phone } as JwtPayload;
        const accessToken = await this.jwtService.sign(payload);
        customer.accessToken = accessToken;

        try{
            await this.customerRepository.save(customer);
        }catch(e){
            if(e.code === '23505'){
                throw new ConflictException("Phone already exists");
            }
            throw new InternalServerErrorException("Error code:"+ e.code);
        }
        delete customer.password;
        delete customer.salt;

        return customer;
    }
    async updateCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { id, phone, fullName, password, email, cityId, gender, status, numOfKids } = createCustomerDto;
        let customer = await this.customerRepository.updateCustomer(createCustomerDto,  this.cityRepository, this.interestRepository);

        let payload: JwtPayload = { phone } as JwtPayload;
        const accessToken = await this.jwtService.sign(payload);
        customer.accessToken = accessToken;

        try{
            await this.customerRepository.save(customer);
        }catch(e){
            if(e.code === '23505'){
                throw new ConflictException("Phone already exists");
            }
            throw new InternalServerErrorException("Error code:"+ e.code);
        }
        delete customer.password;
        delete customer.salt;

        return customer;
    }
    async signIn(signInCustomerDto: SignInCustomerDto): Promise<Customer> {
        let customer = await this.customerRepository.validatePassword(signInCustomerDto);

        if(!customer){
            throw new UnauthorizedException('Invalid credentials');
        }
        let phone = customer.phone;

        let payload: JwtPayload = { phone } as JwtPayload;
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

    async getCustomerById(id: number){
        const found = await this.customerRepository.findOne({ where: { id: id },
            relations: [
            'reservations', 
            'reservations.place', 
            'reservations.room', 
            'tripsCreated', 
            'interests'
        ]});
  
        // const place = await this.placeRepository.findOne({ where: { id: found[0].places[0].id }});
        // return place;
        const city = await this.cityRepository.findOne({ where: { id: found.cityId }});
        // const customer = await this.customerRepository.createQueryBuilder("Customer")
        //     .leftJoinAndSelect('Customer.reservations', 'reservation')
        //     .leftJoinAndSelect('reservation.place', 'place')
        //     .leftJoinAndSelect('reservation.room', 'room')
        //     .where({id: id})
        //     .getMany();  
        if (!found) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        delete found.accessToken;
        delete found.password;
        delete found.salt;
        const res = new Map()
        res.set("name","Logrocket")
        var map = {
            'customer': found,
            'city': city
        };

        return map;
    }

    async getCustomerByPhone(phone: string): Promise<Customer> {
        const found = await this.customerRepository.findOne({ where: { phone: phone } });

        if (!found) {
            throw new NotFoundException(`Customer with phone ${phone} not found`);
        }

        delete found.password;
        delete found.salt;
        return found;
    }

    async getHomePage(id: number) {
        return this.customerRepository.getHomePage(id, this.reservationRepository, this.cityRepository, this.placeRepository, this.blogRepository, this.categoryRepository);
    }

    async getCustomerReviews(id: number) {
        const found = await this.customerRepository.findOne({where: {id: id}});
        if(!found){
            throw new NotFoundException('Customer not found');
        }

        const reviews = await this.reviewRepository.createQueryBuilder('Review').leftJoinAndSelect('Review.place', 'place').where({customer: found}).getMany();
    

        return reviews;
    }

    async getCustomerInterests(id: number) {
        const found = await this.customerRepository.findOne({where: {id: id}});
        if(!found){
            throw new NotFoundException('Customer not found');
        }

        const customers = await this.customerRepository
            .createQueryBuilder('customer')
            
        const customerInterests = await this.interestRepository
            .createQueryBuilder('interest')
            .leftJoinAndSelect('interest.customers', 'customers')
            .where(() => {
                const subquery = customers
                    .subQuery()
                    .select('customer.id').
                    from(Customer, 'customer')
                    .where('customer.id = :id')
                    .getQuery()
                    return "\"customers\".\"id\" IN " + subquery
            })
            .setParameter("id", id)
            .getMany()

            for(let i = 0; i < customerInterests.length; i++){
                delete customerInterests[i].customers
            }

        return customerInterests;
    }
}
