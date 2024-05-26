import * as Yup from 'yup'

export const EntitySchema = Yup.object().shape({
    title: Yup.string()
        .required("The title is required")
        .typeError("The title must be a text"),
    properties: Yup.object()
        .required("The properties are required")
        .default({})
        .typeError("The properties must be valid"),
    description: Yup.string()
        .max(2800)
        .required("The description is required")
        .typeError("The description must be a text"),
    author: Yup.string()
        .nullable()
        .max(30)
        .typeError("The author must be a text"),
    image: Yup.object()
        .nullable()
        .test('is-image', 'The image must by valid', (value) => {
            if (!value) return true

            const keys = Object.keys(value)

            if (keys.length !== 2) return false

            if (!keys.includes('src') || !keys.includes('alt')) return false

            return true
        }),
    sections: Yup.string(),
    type: Yup.string()
        .max(30)
        .required()
        .typeError("The type must be a text"),
})
