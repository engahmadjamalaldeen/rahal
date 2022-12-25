import { BaseEntity } from "typeorm";
export declare class Category extends BaseEntity {
    id: number;
    name: string;
    page: string;
    endPoint: string;
    isActive: boolean;
}
