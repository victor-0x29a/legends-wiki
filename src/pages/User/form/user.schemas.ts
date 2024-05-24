import * as Yup from 'yup'

const userSchema = {
    id: Yup.number()
        .integer()
        .positive()
        .required(),
    name: Yup.string()
        .default('Desconhecido')
        .required(),
    username: Yup.string()
        .max(20)
        .required(),
    password: Yup.string()
        .required()
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
