import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    page: string;
    @Column()
    endPoint: string;

    @Column()
    isActive: boolean;
}