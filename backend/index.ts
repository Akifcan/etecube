import express, { Express, Response, NextFunction } from 'express'
import AppDataSource from './db'
import cors from 'cors'

import authRouter from './routers/auth'
import companyRouter from './routers/company'
import productRouter from './routers/product'
import { authGuard } from './middleware'

const app: Express = express()

app.use(cors())
app.use(express.json())

const port = 3000


AppDataSource.initialize()
    .then(() => {

        app.use('/auth', authRouter)
        app.use('/company', authGuard, companyRouter)
        app.use('/product', authGuard, productRouter)

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    }).catch(error => {
        console.log(error)
    })

