import express, { Request, Response } from 'express'
import UserRequest from '../interface/UserRequest'
const router = express.Router()

router.get('/', (req: UserRequest, res: Response) => {
    res.send(req.user)
})

export default router