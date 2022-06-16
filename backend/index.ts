import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

import { DataSource } from "typeorm"
import { User } from './entity/user'

const app: Express = express()
app.use(express.json())

dotenv.config()
const port = 3000

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

AppDataSource.initialize()
    .then(() => {

        console.log("connected");


        app.post('/login', (req: Request, res: Response) => {
            res.send(req.body)
        })

        app.post('/register', (req: Request, res: Response) => {
            res.send('ok')
        })

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    }).catch(error => {
        console.log(error)
    })

