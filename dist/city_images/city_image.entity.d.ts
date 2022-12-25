import { BaseEntity } from "typeorm";
export declare class CityImage extends BaseEntity {
    id: number;
    url: string;
    cityId: number;
}
