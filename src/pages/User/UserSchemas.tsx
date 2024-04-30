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
        .max(20)
        .required("Nome de usuário é obrigatório"),
    password: Yup.string()
        .required("Senha é obrigatória"),
}
