
import { Container } from "@chakra-ui/react"
import { entityTypesArray } from "./entity.constant"
import { EntityForm } from "./EntityForm"
import { EntityModel } from "../../api"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAlert } from "../../hooks/useAlert"
import { useError } from "../../hooks/useError"
import { DashboardHeader } from "../Dashboard/Header"

const BaseEntityForm = {
    title: "",
    properties: {},
    description: "",
    author: "",
    image: null,
    sections: "",
    type: entityTypesArray[0],
}

export const CreateEntityPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const Navigate = useNavigate()

    const {
        alert
    } = useAlert()

    const { translateErrors } = useError()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = useCallback((values: any) => {
        setIsLoading(true)
        EntityModel.create(values)
            .then(() => {
                alert({ text: "Entidade criada", type: "success" })
                Navigate("/entity")
            })
            .catch((errorList) => {
                const errors = translateErrors(errorList)
                errors!.forEach((error) => alert({ text: error }))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [Navigate, alert, translateErrors])

    const onBack = useCallback(() => Navigate("/entity"), [Navigate])

    return (
        <Container maxW="800px">
            <DashboardHeader title="Criação de entidade" onBackClick={onBack} />
            <EntityForm initialValues={BaseEntityForm} onSubmit={onSubmit} isLoading={isLoading} />
        </Container>
    )
}
