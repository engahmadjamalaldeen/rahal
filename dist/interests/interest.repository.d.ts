import { Repository } from "typeorm";
import { CreateInterestDto } from "./dto/create-interest-dto";
import { Interest } from "./interest.entity";
export declare class InterestRepository extends Repository<Interest> {
    addInterest(createInterestDto: CreateInterestDto): Promise<Interest>;
}
