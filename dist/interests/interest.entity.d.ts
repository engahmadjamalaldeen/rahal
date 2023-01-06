import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { BaseEntity } from "typeorm";
export declare class Interest extends BaseEntity {
    id: number;
    name: string;
    nameAR: string;
    image: string;
    customers: Customer[];
    places: Place[];
    setComputed(): void;
}
