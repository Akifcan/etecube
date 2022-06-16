import dotenv from 'dotenv'
dotenv.config()

import { DataSource } from "typeorm"
import { User } from './entity/user'

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: process.env.POSTGRES_PORT as unknown as number,
    username: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User],
    synchronize: true,
    logging: false,
})

const userRepository = AppDataSource.getRepository(User)
export { userRepository }


export default AppDataSource