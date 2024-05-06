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
import { FormEvent, useCallback, useContext } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { FormLabels } from "../../i18n/forms.i18n"
import { EntityList } from "../../i18n/entity.i18n"

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
        .nullable()
        .max(30)
        .typeError('O autor deve ser um texto.'),
    image: Yup.object()
        .nullable()
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
        validateOnChange: false
    })

    const onFormSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        formik.submitForm()
    }, [formik])

    const { translate } = useContext(I18nContext)

    return (
        <FormControl as="form" onSubmit={onFormSubmit}>
            <FormLabel>{translate(FormLabels, "Author")}</FormLabel>
            <Input placeholder={translate(FormLabels, "Not required")} name="author" required={false} onChange={formik.handleChange} value={formik.values?.author || ""} disabled={isLoading} />
            <FormError errorData={formik.errors.author} />
            <FormLabel>{translate(FormLabels, "Title")}</FormLabel>
            <Input name="title" placeholder={translate(FormLabels, "Put a title")} onChange={formik.handleChange} value={formik.values.title} disabled={isLoading} />
            <FormError errorData={formik.errors.title} />
            <FormLabel>{translate(FormLabels, "Description")}</FormLabel>
            <Input placeholder={translate(FormLabels, "Put a description")} name="description" onChange={formik.handleChange} value={formik.values.description} disabled={isLoading} />
            <FormError errorData={formik.errors.description} />
            <FormLabel>{translate(FormLabels, "Entity type")}</FormLabel>
            <RadioGroup defaultValue={entityTypesArray[0]} name="type" value={formik.values.type}>
                <HStack>
                    {entityTypesArray.map((type, index) => (
                        <Radio value={type} key={`${index}-ratio-item-entity-creation`} isDisabled={isLoading} onClick={() => formik.setFieldValue("type", type)}>{translate(EntityList, entityTypes?.[type])}</Radio>
                    ))}
                </HStack>
            </RadioGroup>
            <FormError errorData={formik.errors.type} />
            <EntityFormProperties onChange={(value) => formik.setFieldValue('properties', value)} value={formik.values.properties} isLoading={isLoading} />
            <EntityFormImage onChange={(value) => formik.setFieldValue('image', value)} value={formik.values.image} isLoading={isLoading} />
            <EntityFormSections onChange={(value) => formik.setFieldValue('sections', value)} value={formik.values.sections} isLoading={isLoading} />
            <Button marginTop={LegendsSize.margin.normal} w="100%" colorScheme="green" type="submit" marginBottom={LegendsSize.margin.large}>
                {isEdition ? translate(FormLabels, "Edit") : translate(FormLabels, "Create")}
            </Button>
        </FormControl>
    )
}
