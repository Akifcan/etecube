import { Request } from 'express'
import { User } from '../entity/user'
interface UserRequest extends Request {
    user?: { firstName: string, lastName: string, email: string, id: number }
}
export default UserRequest