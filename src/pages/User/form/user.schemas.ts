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

const createUserSchema = Yup.object().shape({
    username: userSchema.username,
    password: userSchema.password,
    name: userSchema.name.optional()
})

const updateUserSchema = Yup.object().shape({
    name: userSchema.name,
    username: userSchema.username
})

export const getUserSchema = (isEdit = false) => {
    if (isEdit) return updateUserSchema
    return createUserSchema
}
