import { Customer } from "src/customers/customer.entity";
import { BaseEntity } from "typeorm";
export declare class Trip extends BaseEntity {
    id: number;
    creatorId: number;
    title: string;
    participents: Customer[];
    numOfParticipents: number;
    setComputed(): void;
}
