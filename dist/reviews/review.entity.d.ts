import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { BaseEntity } from "typeorm";
export declare class Review extends BaseEntity {
    id: number;
    reviewText: string;
    reviewMark: number;
    customer: Customer;
    place: Place;
    setComputed(): void;
}
