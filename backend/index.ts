import express, { Express, Response, NextFunction } from 'express'
import AppDataSource from './db'
import UserRequest from './interface/UserRequest'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import authRouter from './routers/auth'
import companyRouter from './routers/company'
import productRouter from './routers/product'

const app: Express = express()

app.use(cors())
app.use(express.json())

const port = 3000

const authGuard = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(403).json({ message: 'no token provided' })
    }
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!)
    req.user = (decoded as any).user

    next()
}

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

