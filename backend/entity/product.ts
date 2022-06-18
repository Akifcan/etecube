import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, CreateDateColumn } from "typeorm"
import { Company } from "./company"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index()
    name: string

    @Column()
    amount: number

    @Column()
    category: string

    @ManyToOne(
        () => Company,
        company => company.id,
        { onDelete: 'CASCADE' }
    )
    company: Company

    @CreateDateColumn()
    createdAt: Date

}

