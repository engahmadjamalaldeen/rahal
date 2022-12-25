import { City } from "src/cities/city.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CityImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    @ManyToOne(() => City, city => city.images)
    cityId: number;
}