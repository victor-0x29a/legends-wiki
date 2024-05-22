import * as Yup from 'yup'

export const userSchema = {
    id: Yup.number()
        .integer()
        .positive()
        .required(),
    name: Yup.string()
        .default('Desconhecido')
        .required(),
    username: Yup.string()
        .max(20, "Username must have at most 20 characters")
        .required("Name of user is required"),
    password: Yup.string()
        .required("Password is required"),
}
