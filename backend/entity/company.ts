import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    legalNumber: string

    @Column()
    country: string

    @Column()
    website: string

}

