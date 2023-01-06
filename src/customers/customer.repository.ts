import { ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CityRepository } from "src/cities/city.repository";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto, Gender, Status } from "./dto/create-customer-dto";
import * as bcrypt from 'bcrypt';
import { SignInCustomerDto } from "./dto/signin-customer-dto";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { JwtPayload } from "./jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';
import { PlaceRepository } from "src/places/place.repository";
import { stringify } from "querystring";
import { BlogRepository } from "src/blogs/blog.repository";
import { InterestRepository } from "src/interests/interest.repository";
import { CategoryRepository } from "src/categories/category.repository";
import { ReservationRepository } from 'src/reservation/reservation.repository';
@CustomRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    async addCustomer(createCustomerDto: CreateCustomerDto, cityRepository: CityRepository, interestRepository: InterestRepository): Promise<Customer> {
        const { phone, fullName, password, email, cityId, gender, status, numOfKids, interests } = createCustomerDto;
        
        const salt = await bcrypt.genSalt();

        const customer = new Customer();
        customer.phone = phone;
        customer.fullName = fullName;
        customer.password = await this.hashPassword(password, salt);
        customer.salt = salt;
        customer.email = email;
        customer.numOfKids = numOfKids;
        const found = await cityRepository.findOne({ where: { id: cityId } });
        if (found) {
            customer.cityId = cityId;
        }
        else {
            throw new NotFoundException("City Id not found");
        }
        if(Object.values(Gender).includes(gender)){
            customer.gender = gender;
        }
        else{
            throw new ForbiddenException('Customer gender should be {MALE, FEMALE}');
        }
        if(Object.values(Status).includes(status)){
            customer.status = status;
        }
        else{
            throw new ForbiddenException('Customer status should be {MARRIED, SINGLE}');
        }
        customer.interests = [];
        for(let i = 0; i < interests.length; i++){
            let interest = await interestRepository.findOne({ where: { id: interests[i] } });
            if (interest) {
                customer.interests.push(interest);
            }
            else {
                throw new NotFoundException("Interest Id not found");
            }
        }

        // try{
        //     await this.save(customer);
        // }catch(e){
        //     if(e.code === '23505'){
        //         throw new ConflictException("Phone already exists");
        //     }
        //     throw new InternalServerErrorException("Error code:"+ e.code);
        // }
        
        // delete customer.password;
        // delete customer.salt;
        return customer;
    }
    async updateCustomer(createCustomerDto: CreateCustomerDto,  cityRepository: CityRepository, interestRepository: InterestRepository): Promise<Customer> {
        const { id, phone, fullName, password, email, cityId, gender, status, numOfKids, interests } = createCustomerDto;
        
        // const salt = await bcrypt.genSalt();

        const customer = await this.findOne({ where: { id: id } });;
        if(phone) {
            if(customer.phone != phone) {
                customer.phone = phone;
            }
        }
        
        if(fullName) {
            customer.fullName = fullName;
        }
        // if(salt) {
        //     customer.salt = salt;
        // }
        if(email) {
            customer.email = email;
        }
        if(numOfKids) {
            customer.numOfKids = numOfKids;
        }
        if(cityId) {
            const found = await cityRepository.findOne({ where: { id: cityId } });
            if (found) {
                customer.cityId = cityId;
            }
            else {
                throw new NotFoundException("City Id not found");
            }
        }
        if(gender) {
            if(Object.values(Gender).includes(gender)){
                customer.gender = gender;
            }
            else{
                throw new ForbiddenException('Customer gender should be {MALE, FEMALE}');
            }
        }
        if(status) {
            if(Object.values(Status).includes(status)){
                customer.status = status;
            }
            else{
                throw new ForbiddenException('Customer status should be {MARRIED, SINGLE}');
            }
        }
        if(interests) {
            customer.interests = [];
            for(let i = 0; i < interests.length; i++){
                let interest = await interestRepository.findOne({ where: { id: interests[i] } });
                if (interest) {
                    customer.interests.push(interest);
                }
                else {
                    throw new NotFoundException("Interest Id not found");
                }
            }
        }

            // this.createQueryBuilder()
            // .update(customer)
            // .execute();

        // try{
        //     await this.save(customer);
        // }catch(e){
        //     if(e.code === '23505'){
        //         throw new ConflictException("Phone already exists");
        //     }
        //     throw new InternalServerErrorException("Error code:"+ e.code);
        // }
        
        // delete customer.password;
        // delete customer.salt;
        return customer;
    }

    async validatePassword(signInCustomerDto: SignInCustomerDto): Promise<Customer> {
        const {phone, password} = signInCustomerDto;
        const user = await this.findOne({where : {phone: phone}});
        if(user && await user.validatePassword(password)){
            return user;
        }
        else{
            return null;
        }

    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }

    async getHomePage(id: number, reservationRepository: ReservationRepository, cityRepository: CityRepository, placeRepository: PlaceRepository, blogRepository: BlogRepository, categoryRepository: CategoryRepository) {
        // let customer = await this.findOne({where: {id: id}, relations: [
        //     'interests', 
        //     'reservations',
        //     'tripsCreated'
        // ]});
        const customer = await this.createQueryBuilder("Customer")
            .leftJoinAndSelect('Customer.reservations', 'reservation')
            .leftJoinAndSelect('reservation.place', 'place')
            .leftJoinAndSelect('reservation.room', 'room')
            .where({id: id})
            .getMany();  
        // return customer;
       //test54
       for(let i = 0; i < customer.length; i++){
            delete customer[i].salt;
            delete customer[i].password;
        }

        const cities = await cityRepository.createQueryBuilder('City')
            .leftJoinAndSelect('City.places', 'places')
            .leftJoinAndSelect('City.customers', 'cities')
            .leftJoinAndSelect('City.blogs', 'blogs')
            .leftJoinAndSelect('City.images', 'images')
            .take(4).getMany();
            for(let i = 0; i < cities.length; i++){
                delete cities[i].customers;
                delete cities[i].places;
                delete cities[i].blogs;
            }
    
            const places = await placeRepository.createQueryBuilder('Place')
                .leftJoinAndSelect('Place.city', 'city')
                .leftJoinAndSelect('Place.reservations', 'reservations')
                .leftJoinAndSelect('city.customers', 'customers')
                .leftJoinAndSelect('city.places', 'places')
                .leftJoinAndSelect('city.blogs', 'blogs')
                .take(4).getMany();

            for(let i = 0; i < places.length; i++){
                delete places[i].city.customers;
                delete places[i].city.places;
                delete places[i].city.blogs;
            }
    
            const blogs = await blogRepository.find({take: 4});   

            const categories = await categoryRepository.find({where: {isActive: true}});

            var map = {
                'customer': customer,
                'cities': cities,
                'places': places,
                'categories': categories,
                'blogs': blogs
            };

            return map;

    }
}