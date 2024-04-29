import { Schema } from "yup"
import { useFormik } from "formik"
import { FormControl, FormLabel, HStack, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { entityTypes, entityTypesArray } from "./entity.constant"

type initialValues = {
    title: string,
    properties: object,
    description: string,
    author: string | null,
    image: object | null,
    sections: string,
    type: string,
}

type IEntityFormProps = {
    initialValues: initialValues,
    onSubmit: (values: initialValues) => void,
    validationSchema: Schema,
}

export const EntityForm = ({
    initialValues,
    onSubmit,
    validationSchema,
}: IEntityFormProps) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationSchema,
    })

    return (
        <FormControl>
            <FormLabel>Autor</FormLabel>
            <Input placeholder="Não obrigatório." name="author" required={false} onChange={formik.handleChange} value={formik.values?.author || ""} />
            <FormLabel>Título</FormLabel>
            <Input placeholder="Título" name="Coloque um título." onChange={formik.handleChange} value={formik.values.title} />
            <FormLabel>Descrição</FormLabel>
            <Input placeholder="Coloque uma descrição." name="description" onChange={formik.handleChange} value={formik.values.description} />
            <FormLabel>Tipo da entidade</FormLabel>
            <RadioGroup defaultValue={entityTypesArray[0]} name="type" onChange={formik.handleChange} value={formik.values.type}>
                <HStack>
                    {entityTypesArray.map((type, index) => (
                        <Radio value={type} key={`${index}-ratio-item-entity-creation`}>{entityTypes?.[type] || ""}</Radio>
                    ))}
                </HStack>
            </RadioGroup>
        </FormControl>
    )
}
