import { City } from "src/cities/city.entity";
import { AfterLoad, BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({nullable: false})
    @ManyToOne(() => City, city => city.blogs)
    cityId: number

    @AfterLoad()
    setComputed() {
      
    }

}