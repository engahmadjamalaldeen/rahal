import { Reservation } from "src/reservation/reservation.entity";
import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column({nullable: false})
    @ManyToOne(() => ReservationType, reservationType => reservationType.rooms, {eager: true})
    @JoinColumn()
    reservationType: ReservationType

    // @Column({nullable: true})
    @OneToMany(() => Reservation, reservation => reservation.room)
    @JoinColumn()
    reservations: Reservation[]
}