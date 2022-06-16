import { Request } from 'express'
import { User } from '../entity/user'
interface UserRequest extends Request {
    user?: { firstName: string, lastName: string, email: string }
}
export default UserRequest