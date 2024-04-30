import { useFormik } from "formik"
import { Button, FormControl, FormLabel, HStack, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { entityTypes, entityTypesArray } from "./entity.constant"
import { FormError } from "../../components/FormError/FormError"
import * as Yup from 'yup'
import { EntityFormProperties } from "./EntityFormProperties"
import { IItemStats } from "../../types/item.type"
import { EntityFormImage } from "./EntityFormImage"
import { EntityFormSections } from "./EntityFormSections"
import { LegendsSize } from "../../styles/constants.style"

type initialValues = {
    title: string,
    properties: IItemStats,
    description: string,
    author: string | null,
    image: {
        src: string,
        alt: string
    } | null,
    sections: string,
    type: string,
}

type IEntityFormProps = {
    initialValues: initialValues,
    onSubmit: (values: initialValues) => void,
    isLoading?: boolean,
    isEdition?: boolean
}

const EntitySchema = Yup.object().shape({
    title: Yup.string()
        .required('O título é obrigatório.')
        .typeError('O título deve ser um texto.'),
    properties: Yup.object()
        .required('As propriedades são obrigatórias.')
        .default({})
        .typeError('As propriedades devem ser válidas.'),
    description: Yup.string()
        .max(2800)
        .required('A descrição é obrigatória.')
        .typeError('A descrição deve ser um texto.'),
    author: Yup.string()
        .max(30)
        .typeError('O autor deve ser um texto.'),
    image: Yup.object()
        .test('is-image', 'A imagem deve ser válida.', (value) => {
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
        .typeError('O tipo deve ser um texto.'),
})

export const EntityForm = ({
    initialValues,
    onSubmit,
    isLoading = false,
    isEdition = false
}: IEntityFormProps) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: EntitySchema,
    })

    return (
        <FormControl>
            <FormLabel>Autor</FormLabel>
            <Input placeholder="Não obrigatório." name="author" required={false} onChange={formik.handleChange} value={formik.values?.author || ""} disabled={isLoading} />
            <FormError errorData={formik.errors.author} />
            <FormLabel>Título</FormLabel>
            <Input placeholder="Título" name="Coloque um título." onChange={formik.handleChange} value={formik.values.title} disabled={isLoading} />
            <FormError errorData={formik.errors.title} />
            <FormLabel>Descrição</FormLabel>
            <Input placeholder="Coloque uma descrição." name="description" onChange={formik.handleChange} value={formik.values.description} disabled={isLoading} />
            <FormError errorData={formik.errors.description} />
            <FormLabel>Tipo da entidade</FormLabel>
            <RadioGroup defaultValue={entityTypesArray[0]} name="type" onChange={formik.handleChange} value={formik.values.type}>
                <HStack>
                    {entityTypesArray.map((type, index) => (
                        <Radio value={type} key={`${index}-ratio-item-entity-creation`} isDisabled={isLoading}>{entityTypes?.[type] || ""}</Radio>
                    ))}
                </HStack>
            </RadioGroup>
            <FormError errorData={formik.errors.type} />
            <EntityFormProperties onChange={(value) => formik.setFieldValue('properties', value)} value={formik.values.properties} isLoading={isLoading} />
            <EntityFormImage onChange={(value) => formik.setFieldValue('image', value)} value={formik.values.image} isLoading={isLoading} />
            <EntityFormSections onChange={(value) => formik.setFieldValue('sections', value)} value={formik.values.sections} isLoading={isLoading} />
            <Button marginTop={LegendsSize.margin.normal} w="100%" colorScheme="green" onClick={() => formik.submitForm()} marginBottom={LegendsSize.margin.large}>
                {isEdition ? "Editar" : "Criar"}
            </Button>
        </FormControl>
    )
}
