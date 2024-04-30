import { useFormik } from "formik"
import { FormControl, FormLabel, HStack, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { entityTypes, entityTypesArray } from "./entity.constant"
import { FormError } from "../../components/FormError/FormError"
import * as Yup from 'yup'
import { EntityFormProperties } from "./EntityFormProperties"
import { IItemStats } from "../../types/item.type"

type initialValues = {
    title: string,
    properties: IItemStats,
    description: string,
    author: string | null,
    image: object | null,
    sections: string,
    type: string,
}

type IEntityFormProps = {
    initialValues: initialValues,
    onSubmit: (values: initialValues) => void,
}

const EntitySchema = Yup.object().shape({
    title: Yup.string()
        .required()
        .typeError('Title must be a string.'),
    properties: Yup.object()
        .required()
        .default({})
        .typeError('Properties must be an object.'),
    description: Yup.string()
        .max(2800)
        .required()
        .typeError('Description must be a string.'),
    author: Yup.string()
        .max(30)
        .typeError('Author must be a string.'),
    image: Yup.object()
        .test('is-image', 'Image must be a valid image.', (value) => {
            if (!value) return true

            const keys = Object.keys(value)

            if (keys.length !== 2) return false

            if (!keys.includes('src') || !keys.includes('alt')) return false

            return true
        })
        .typeError('Image must be an object.'),
    sections: Yup.string(),
    type: Yup.string()
        .max(30)
        .required()
        .typeError('Type must be a string.'),
})

export const EntityForm = ({
    initialValues,
    onSubmit
}: IEntityFormProps) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: EntitySchema,
    })

    return (
        <FormControl>
            <FormLabel>Autor</FormLabel>
            <Input placeholder="Não obrigatório." name="author" required={false} onChange={formik.handleChange} value={formik.values?.author || ""} />
            <FormError errorData={formik.errors.author} />
            <FormLabel>Título</FormLabel>
            <Input placeholder="Título" name="Coloque um título." onChange={formik.handleChange} value={formik.values.title} />
            <FormError errorData={formik.errors.title} />
            <FormLabel>Descrição</FormLabel>
            <Input placeholder="Coloque uma descrição." name="description" onChange={formik.handleChange} value={formik.values.description} />
            <FormError errorData={formik.errors.description} />
            <FormLabel>Tipo da entidade</FormLabel>
            <RadioGroup defaultValue={entityTypesArray[0]} name="type" onChange={formik.handleChange} value={formik.values.type}>
                <HStack>
                    {entityTypesArray.map((type, index) => (
                        <Radio value={type} key={`${index}-ratio-item-entity-creation`}>{entityTypes?.[type] || ""}</Radio>
                    ))}
                </HStack>
            </RadioGroup>
            <FormError errorData={formik.errors.type} />
            <EntityFormProperties onChange={(value) => formik.setFieldValue('properties', value)} value={formik.values.properties} />
        </FormControl>
    )
}
