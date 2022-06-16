import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from "typeorm"
import { Product } from "./product"

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

    @OneToMany(
        () => Product,
        product => product.company,
    )
    product: Product

}

