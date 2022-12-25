import { ReservationType } from "src/reservationـtype/reservationـtype.entity";
import { AfterLoad, BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Amenity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    image: string;

    // @Column()
    @ManyToMany(() => ReservationType, reservationType => reservationType.amenities)
    reservationTypes: ReservationType[]

    @AfterLoad()
    setComputed() {
      
    }

}