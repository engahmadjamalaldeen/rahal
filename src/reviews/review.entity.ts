import { City } from "src/cities/city.entity";
import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { AfterLoad, BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reviewText: string;

    @Column("decimal")
    reviewMark: number;

    // @Column({nullable: false})
    @ManyToOne(() => Customer, customer => customer.reviews, {eager: true})
    customer: Customer;

    // @Column({nullable: false})
    @ManyToOne(() => Place, place => place.reviews)
    place: Place

    @AfterLoad()
    setComputed() {
      
    }

}