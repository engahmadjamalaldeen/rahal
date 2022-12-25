import { City } from "src/cities/city.entity";
import { Interest } from "src/interests/interest.entity";
import { Membership } from "src/memberships/membership.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { Review } from "src/reviews/review.entity";
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaceType } from "./dto/create-place-dto";

@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({nullable: true})
    price: string;


    @Column({nullable: true})
    description: string;

    @Column()
    type: PlaceType

    // @Column()
    @ManyToOne(() => City, city => city.places)
    @JoinTable()
    city: City;

    @Column({nullable: true})
    isMembership: boolean;

    @OneToOne(() => Membership, membership => membership.place)
    membership: Membership;

    @OneToMany(() => Reservation, reservation => reservation.place, {eager: true})
    reservations: Reservation[]

    @OneToMany(() => ReservationType, reservationType => reservationType.placeId)
    reservationsTypes: ReservationType[]

    @ManyToMany(() => Interest, interest => interest.places, {eager: true})
    @JoinTable()
    tags: Interest[]

    @OneToMany(() => Review, review => review.place)
    reviews: Review[]

    reviewsMark: number;

    numOfReservations: number;

    @AfterLoad()
    setComputed() {
        let sum = 0;
        if(this.reviews !== undefined){
            for(let i = 0; i < this.reviews.length; i++){
                sum += Number(this.reviews[i].reviewMark);
            }
            // console.log(sum);
            this.reviewsMark = sum/this.reviews.length;
            this.reviewsMark = Number(this.reviewsMark.toFixed(1));
            var decimal = this.reviewsMark - Math.floor(this.reviewsMark);
            if(decimal > 0.7 && decimal < 1) this.reviewsMark = Math.round(this.reviewsMark);
            if(decimal >= 0.3 && decimal <= 0.7) this.reviewsMark = Math.floor(this.reviewsMark) + 0.5;
            if(decimal >= 0.0 && decimal < 0.3) this.reviewsMark = Math.floor(this.reviewsMark);
        }
        if(this.reservations !== undefined){
            this.numOfReservations = this.reservations.length;
        }
        else {
            this.numOfReservations = 0;
        }
    }
}