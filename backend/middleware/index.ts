import { NextFunction, Response } from "express"
import UserRequest from "../interface/UserRequest"
import jwt from 'jsonwebtoken'

export const authGuard = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(403).json({ message: 'no token provided' })
    }
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!)
    req.user = (decoded as any).user

    next()
}
