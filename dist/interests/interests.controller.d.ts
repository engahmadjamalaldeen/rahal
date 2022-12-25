import { AddInterestsToCustomerDto } from './dto/add-interests-to-customer-dto';
import { AddInterestsToPlaceDto } from './dto/add-interests-to-place-dto';
import { CreateInterestDto } from './dto/create-interest-dto';
import { Interest } from './interest.entity';
import { InterestsService } from './interests.service';
export declare class InterestsController {
    private interestsService;
    constructor(interestsService: InterestsService);
    getInterests(): Promise<Interest[]>;
    getPlacesByInterestName(interestName: string, cityId: number): Promise<import("../places/place.entity").Place[]>;
    addInterest(createInterestDto: CreateInterestDto): Promise<Interest>;
    getInterestById(id: number): Promise<Interest>;
    addInterestsToCustomer(addInterestsToCustomerDto: AddInterestsToCustomerDto): Promise<import("../customers/customer.entity").Customer>;
    addInterestsToPlace(addInterestsToPlaceDto: AddInterestsToPlaceDto): Promise<import("../places/place.entity").Place>;
    editInterestById(id: number, createInterestDto: CreateInterestDto): Promise<Interest>;
    deleteInterestById(id: number): Promise<boolean>;
}
