import { Transform } from "class-transformer";
import { Amenity } from "src/amenities/amenities.entity";
import { Customer } from "src/customers/customer.entity";
import { PlaceType } from "src/places/dto/create-place-dto";
import { Place } from "src/places/place.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Room } from "src/rooms/room.entity";
import { AfterLoad, BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PriceType } from "./dto/create-reservation-type-dto";

@Entity()
export class ReservationType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    priceType: PriceType;

    @OneToMany(() => Room, room => room.reservationType)
    rooms: Room[]

    @Column({nullable: false})
    @ManyToOne(() => Place, place => place.reservationsTypes)
    placeId: number;

    // @Column()
    @ManyToMany(() => Amenity, amenity => amenity.reservationTypes, {eager: true})
    @JoinTable()
    amenities: Amenity[]

    @AfterLoad()
    setComputed() {
      
    }

}