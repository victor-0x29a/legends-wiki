import { useCallback, useContext, useEffect, useRef } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { useUser } from "./hooks/useUser"
import { useAlert } from "../../shared/hooks/useAlert"

import { DashboardHeader } from "../Dashboard/Header"
import { UserForm } from "./components"

import { Box, Container, Skeleton } from "@chakra-ui/react"

import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"

import { editUserPayload } from "../../types/user.type"

const skeletonOrder = [
    ["100%", "80px"], ["100%", "50px"],
    ["100%", "50px"], ["100%", "50px"],
    ["100%", "50px"]
]

const UsersSkeleton = () => {
    return <Box>
        {skeletonOrder.map(([width, height], index) => (
            <Skeleton
                width={width}
                height={height}
                key={`${index}-skeleton-edit-user-page`}
            />
        ))}
    </Box>
}

export const EditUserPage = () => {
    const { translate } = useContext(I18nContext)

    const { alert } = useAlert()

    const Navigate = useNavigate()

    const onBackClick = useCallback(() => Navigate(-1), [Navigate])

    const Params = useParams()

    const isFetched = useRef(false)

    const {
        user,
        findUser,
        isLoadingVisualization,
        isLoadingEdition,
        editUser
    } = useUser()

    useEffect(() => {
        if (isFetched.current) return
        isFetched.current = true
        findUser(Number(Params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSuccessCallback = useCallback(() => {
        Navigate("/users?refresh=true")
        alert({ text: translate(CommonLabels, "User updated"), type: "success" })
    }, [Navigate, alert, translate])

    const handleSubmit = useCallback((payload: Record<string, string | number>) => {
        if (isLoadingVisualization || !user) return

        editUser(user.id, payload as editUserPayload, onSuccessCallback)
    }, [editUser, isLoadingVisualization, onSuccessCallback, user])

    if (isLoadingVisualization || !isFetched.current) {
        return <UsersSkeleton />
    }

    if (!user) {
        Navigate("/users")
        return
    }

    return (
        <Container maxW={"800px"}>
            <DashboardHeader
                onBackClick={onBackClick}
                title={translate(CommonLabels, "Edit user")}
            />
            <UserForm
                initialValues={user!}
                onSubmit={handleSubmit}
                isEdition={true}
                isLoading={isLoadingEdition}
            />
        </Container>
    )
}
