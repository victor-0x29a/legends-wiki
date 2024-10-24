import { useCallback, useContext, useState } from "react"

import { useNavigate } from "react-router-dom"

import { EntityModel } from "../../api"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { useAlert } from "../../shared/hooks/useAlert"
import { useError } from "../../shared/hooks/useError"

import { DashboardHeader } from "../Dashboard/Header"
import { EntityForm } from "./form/EntityForm"

import { Container } from "@chakra-ui/react"

import { entityTypesArray } from "../../entity.constant"

import { FormLabels } from "../../shared/i18n/forms.i18n"

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

    const { showErrors } = useError()

    const { translate } = useContext(I18nContext)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = useCallback((values: any) => {
        setIsLoading(true)
        EntityModel.create(values)
            .then(() => {
                alert({ text: translate(FormLabels, "Entity created"), type: "success" })
                Navigate("/entity")
            })
            .catch(showErrors)
            .finally(() => {
                setIsLoading(false)
            })
    }, [Navigate, alert, showErrors, translate])

    const onBack = useCallback(() => Navigate("/entity"), [Navigate])

    return (
        <Container maxW="800px">
            <DashboardHeader
                title={translate(FormLabels, "Creation of entity")}
                onBackClick={onBack}
            />
            <EntityForm
                initialValues={BaseEntityForm}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </Container>
    )
}
