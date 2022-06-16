import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import AppDataSource from "../db"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string

}

