import { Blog } from "src/blogs/blog.entity";
import { CityImage } from "src/city_images/city_image.entity";
import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { AfterLoad, BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    nameAR: string;

    @Column({ nullable: true })
    descriptionAR: string;
    @OneToMany(() => Place, place => place.city, {eager: true})
    places: Place[]

    @OneToMany(() => Customer, customer => customer.cityId)
    customers: Customer[]

    @OneToMany(() => Blog, blog => blog.cityId)
    blogs: Blog[]

    @OneToMany(() => CityImage, cityImage => cityImage.cityId)
    images: CityImage[]


    numOfPlaces: number;

    numOfCustomers: number;

    numOfBlogs: number;

    @AfterLoad()
    setComputed() {
        if(this.customers !== undefined){
            this.numOfCustomers = this.customers.length;
        }
        else {
            this.numOfCustomers = 0;
        }
        if(this.places !== undefined){
            this.numOfPlaces = this.places.length;
        }
        else {
            this.numOfPlaces = 0;
        }
        if(this.blogs !== undefined){
            this.numOfBlogs = this.blogs.length;
        }
        else {
            this.numOfBlogs = 0;
        }
    }

}