import express, { Express, Request, Response } from 'express'
import AppDataSource from './db'
import authRouter from './routers/auth'

const app: Express = express()

app.use(express.json())

const port = 3000

AppDataSource.initialize()
    .then(() => {

        console.log("connected");

        app.use('/auth', authRouter)

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    }).catch(error => {
        console.log(error)
    })

