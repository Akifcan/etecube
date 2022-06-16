import express, { Request, Response } from 'express'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { userRepository } from '../db'
const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await userRepository.findOneBy({ email, password: md5(password) })
    delete user?.password
    const token = jwt.sign({ user }, process.env.JWT_SECRET!)
    if (!user) {
        res.status(403).json({ message: 'This user not found' })
    }
    return res.status(200).json({ token, user })
})

router.post('/register', async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body

    const isEmailExists = await userRepository.findOneBy({ email })

    if (isEmailExists) {
        return res.status(403).json({ message: 'This email already registered' })
    }

    const saveUser = await userRepository.save({ email, password: md5(password), lastName, firstName })
    const { password: userPassword, ...user } = saveUser
    const token = jwt.sign({ user }, process.env.JWT_SECRET!)

    res.status(201).json({ user, token })
})

export default router