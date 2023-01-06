import { Blog } from "src/blogs/blog.entity";
import { CityImage } from "src/city_images/city_image.entity";
import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { BaseEntity } from "typeorm";
export declare class City extends BaseEntity {
    id: number;
    name: string;
    description: string;
    nameAR: string;
    descriptionAR: string;
    places: Place[];
    customers: Customer[];
    blogs: Blog[];
    images: CityImage[];
    numOfPlaces: number;
    numOfCustomers: number;
    numOfBlogs: number;
    setComputed(): void;
}
