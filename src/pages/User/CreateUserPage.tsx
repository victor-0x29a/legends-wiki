import { Container } from "@chakra-ui/react"
import { DashboardHeader } from "../Dashboard/Header"
import { useCallback, useContext, useMemo } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { CommonLabels } from "../../i18n/commonLabels.i18n"
import { useNavigate } from "react-router-dom"
import { UserForm } from "./components"
import { useUser } from "./hooks/useUser"
import { createUserPayload } from "../../types/user.type"
import { useAlert } from "../../hooks/useAlert"
import { FormLabels } from "../../i18n/forms.i18n"

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
