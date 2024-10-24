import { useCallback, useContext, useMemo } from "react"

import { useNavigate } from "react-router-dom"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { useAlert } from "../../shared/hooks/useAlert"
import { useUser } from "./hooks/useUser"

import { DashboardHeader } from "../Dashboard/Header"
import { UserForm } from "./components"

import { Container } from "@chakra-ui/react"

import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"
import { FormLabels } from "../../shared/i18n/forms.i18n"

import type { createUserPayload } from "../../types/user.type"

export const CreateUserPage = () => {
    const { translate } = useContext(I18nContext)

    const Navigate = useNavigate()

    const {
        createUser,
        isLoadingCreation,
    } = useUser()

    const {
        alert
    } = useAlert()

    const {
        onBackClick
    } = useMemo(() => ({
        onBackClick: () => !isLoadingCreation && Navigate(-1)
    }), [Navigate, isLoadingCreation])

    const onSubmitCallback = useCallback(() => {
        Navigate("/users?refresh=true")
        alert({ text: translate(FormLabels, "User created"), type: "success" })
    }, [Navigate, alert, translate])

    const handleSubmit = useCallback((payload: Record<string, string | number>) => {
        createUser(payload as unknown as createUserPayload, onSubmitCallback)
    }, [createUser, onSubmitCallback])

    return <Container maxW={"800px"}>
        <DashboardHeader
            title={translate(CommonLabels, "Creation of user")}
            onBackClick={onBackClick}
        />
        <UserForm
            initialValues={{
                username: '',
                password: '',
                name: ''
            }}
            onSubmit={handleSubmit}
            isEdition={false}
            isLoading={isLoadingCreation}
        />
    </Container>
}
