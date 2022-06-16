import express, { Express, Request, Response } from 'express'
import md5 from 'md5'
import AppDataSource, { userRepository } from './db'

const app: Express = express()
app.use(express.json())

const port = 3000

AppDataSource.initialize()
    .then(() => {

        console.log("connected");


        app.post('/login', (req: Request, res: Response) => {
            res.send(req.body)
        })

        app.post('/register', async (req: Request, res: Response) => {
            const { email, password, firstName, lastName } = req.body

            const isEmailExists = await userRepository.findOneBy({ email })

            if (isEmailExists) {
                return res.status(403).json({ message: 'This email already registered' })
            }

            const saveUser = await userRepository.save({ email, password: md5(password), lastName, firstName })
            res.status(201).json(saveUser)
        })

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        })
    }).catch(error => {
        console.log(error)
    })

