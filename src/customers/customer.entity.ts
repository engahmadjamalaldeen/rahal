import { City } from "src/cities/city.entity";
import { Place } from "src/places/place.entity";
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender, Status } from "./dto/create-customer-dto";
import * as bcrypt from 'bcrypt';
import { Trip } from "src/trips/trip.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Review } from "src/reviews/review.entity";
import { Interest } from "src/interests/interest.entity";

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accessToken: string;

    @Column({ unique: true })
    phone: string;
    
    @Column()
    fullName: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    email: string;

    @Column()
    @ManyToOne(() => City, city => city.customers)
    cityId: number;

    @Column()
    gender: Gender;

    @Column({nullable: true})
    status: Status;

    @Column({nullable: true})
    numOfKids: number;

    @ManyToMany(() => Interest, interest => interest.customers)
    interests: Interest[]

    @OneToMany(() => Reservation, reservation => reservation.customer)
    @JoinColumn()
    reservations: Reservation[];

    // @Column({nullable: true})
    @OneToMany(() => Trip, trip => trip.creatorId)
    @JoinColumn()
    tripsCreated: Trip[];

    // @Column({nullable: true})
    @ManyToMany(() => Trip, trip => trip.participents, {eager: true})
    @JoinTable()
    tripsParticipated: Trip[]

    @OneToMany(() => Review, review => review.customer)
    @JoinColumn()
    reviews: Review[];

    numOfTrpisParticipted: number;

    numOfTrpisCreated: number;

    numOfReservations: number;


    @AfterLoad()
    setComputed() {
        if(this.tripsParticipated !== undefined)
            this.numOfTrpisParticipted = this.tripsParticipated.length; 
        if(this.tripsCreated !== undefined)
            this.numOfTrpisCreated = this.tripsCreated.length; 
        if(this.reservations !== undefined)
            this.numOfReservations = this.reservations.length; 
    }

    
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}