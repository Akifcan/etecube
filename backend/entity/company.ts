import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm"

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index()
    name: string

    @Column()
    legalNumber: string

    @Column()
    country: string

    @Column()
    website: string

}

