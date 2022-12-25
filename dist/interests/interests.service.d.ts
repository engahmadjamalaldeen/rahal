import { CustomerRepository } from 'src/customers/customer.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { AddInterestsToCustomerDto } from './dto/add-interests-to-customer-dto';
import { AddInterestsToPlaceDto } from './dto/add-interests-to-place-dto';
import { CreateInterestDto } from './dto/create-interest-dto';
import { Interest } from './interest.entity';
import { InterestRepository } from './interest.repository';
export declare class InterestsService {
    private interestRepository;
    private customerRepository;
    private placeRepository;
    constructor(interestRepository: InterestRepository, customerRepository: CustomerRepository, placeRepository: PlaceRepository);
    getInterests(): Promise<Interest[]>;
    addInterest(createInterestDto: CreateInterestDto): Promise<Interest>;
    getInterestById(id: number): Promise<Interest>;
    editInterestById(id: number, createInterestDto: CreateInterestDto): Promise<Interest>;
    deleteInterestById(id: number): Promise<boolean>;
    addInterestsToCustomer(addInterestsToCustomerDto: AddInterestsToCustomerDto): Promise<import("../customers/customer.entity").Customer>;
    addInterestsToPlace(addInterestsToPlaceDto: AddInterestsToPlaceDto): Promise<import("../places/place.entity").Place>;
    getPlacesByInterestName(interestName: string, cityId: number): Promise<import("../places/place.entity").Place[]>;
}
