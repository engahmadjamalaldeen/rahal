import { Transform } from "class-transformer";
import { Customer } from "src/customers/customer.entity";
import { PlaceType } from "src/places/dto/create-place-dto";
import { Place } from "src/places/place.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { Room } from "src/rooms/room.entity";
import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./dto/create-client-reservation-dto";

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    placeType: PlaceType;

    @Column()
    status: Status;
    // @Column()
    // reservationType: ReservationType;

    @Transform(x => new Date())
    @Column('text')
    fromDate: string;

    @Transform(x => new Date())
    @Column('text')
    toDate: string;

    // @Column('text')
    @ManyToOne(() => Customer, customer => customer.reservations)
    customer: Customer;

    // @Column('text')
    @ManyToOne(() => Place, place => place.reservations)
    place: Place;

    @ManyToOne(() => Room, room => room.reservations)
    room: Room;

    @Column()
    price: number

    @Column({ nullable: true })
    numOfDays: number;

    @AfterLoad()
    setComputed() {
        let fromDateTime = new Date(this.fromDate);
        let toDateTime = new Date(this.toDate);
        this.numOfDays = Math.floor(Math.abs(<any>fromDateTime - <any>toDateTime) / (1000*60*60*24));
    }

}