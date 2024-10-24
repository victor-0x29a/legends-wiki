import * as Yup from 'yup'
import { userSchema } from '../../User/form/user.schemas'

export const signInSchema = Yup.object().shape({
    username: userSchema.username,
    password: userSchema.password
})
