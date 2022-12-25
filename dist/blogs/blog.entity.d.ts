import { BaseEntity } from "typeorm";
export declare class Blog extends BaseEntity {
    id: number;
    title: string;
    description: string;
    cityId: number;
    setComputed(): void;
}
