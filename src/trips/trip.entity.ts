import { City } from "src/cities/city.entity";
import { Customer } from "src/customers/customer.entity";
import { Membership } from "src/memberships/membership.entity";
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trip extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(() => Customer, customer => customer.tripsCreated)
    creatorId: number;

    @Column()
    title: string;

    // @Column({nullable: true})
    @ManyToMany(() => Customer, customer => customer.tripsParticipated, {eager: false, cascade: true})
    @JoinTable()
    participents: Customer[]

    numOfParticipents: number;


    @AfterLoad()
    setComputed() {
        if(this.participents !== undefined)
            this.numOfParticipents = this.participents.length; 
    }
}