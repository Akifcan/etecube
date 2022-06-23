import dotenv from 'dotenv'
dotenv.config()

import { DataSource } from "typeorm"
import { Company } from './entity/company'
import { Product } from './entity/product'
import { User } from './entity/user'

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as unknown as number,
    username: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Company, Product],
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    }
})

const userRepository = AppDataSource.getRepository(User)
const companyRepository = AppDataSource.getRepository(Company)
const productRepository = AppDataSource.getRepository(Product)

export { userRepository, companyRepository, productRepository }


export default AppDataSource