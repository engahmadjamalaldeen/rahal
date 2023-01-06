import { Customer } from "src/customers/customer.entity";
import { Place } from "src/places/place.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({nullable: true})
    nameAR: string;
    //
    
    @Column({nullable: true})
    image: string;

    // @Column("text")
    @ManyToMany(() => Customer, customer => customer.interests, {cascade: true})
    @JoinTable()
    customers: Customer[]

    @ManyToMany(() => Place, place => place.tags)
    @JoinTable()
    places: Place[]

    @AfterLoad()
    setComputed() {
      
    }

}