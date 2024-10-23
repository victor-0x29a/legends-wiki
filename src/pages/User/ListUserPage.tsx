import { useCallback, useContext, useMemo, useState } from "react"

import { useNavigate } from "react-router-dom"

import { I18nContext } from "../../contexts/i18n.context"

import { UserDeleteModal, UserTable } from "./components"
import { DashboardHeader } from "../Dashboard/Header"

import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Container } from "@chakra-ui/react"

import { useUser } from "./hooks/useUser"
import { useAlert } from "../../hooks/useAlert"
import { useQueryAction } from "../../hooks/useQueryAction"
import { useUserList } from "./hooks/useUserList"

import { CommonLabels } from "../../i18n/commonLabels.i18n"
import { FormLabels } from "../../i18n/forms.i18n"

import { LegendsSize } from "../../styles/constants.style"


export const ListUserPage = () => {
    const Navigate = useNavigate()

    const {
        isLoading,
        users,
        refreshRequest
    } = useUserList()

    const {
        deleteUser,
        isLoadingDeletion
    } = useUser()

    const {
        translate
    } = useContext(I18nContext)

    const {
        alert
    } = useAlert()

    const [deleteModalData, setDeleteModalData] = useState<{
        isOpen: boolean,
        userId: null | number
    }>({
        isOpen: false,
        userId: null,
    })

    const {
        onCreateClick,
        onEditClick,
        onDeleteClick,
        onCloseDeleteModal,
        onBackClick
    } = useMemo(() => ({
        onCreateClick: () => Navigate('/users/create'),
        onEditClick: (id: number) => Navigate(`/users/edit/${id}`),
        onDeleteClick: (id: number) => setDeleteModalData({ isOpen: true, userId: id }),
        onCloseDeleteModal: () => setDeleteModalData((curr) => ({ ...curr, isOpen: false, })),
        onBackClick: () => Navigate(-1),
    }), [Navigate])

    const deleteUserCallback = useCallback(() => {
        refreshRequest()
        alert({ text: translate(FormLabels, "User deleted"), type: "success" })
        onCloseDeleteModal()
    }, [alert, onCloseDeleteModal, translate, refreshRequest])

    const onDeleteUser = useCallback((id: number) => {
        deleteUser(id, deleteUserCallback)
    }, [deleteUser, deleteUserCallback])

    useQueryAction({
        queryValue: "true",
        queryKey: "refresh",
        inactivatedValue: "false",
        queryAction: refreshRequest
    })

    return <Container maxW={"800px"}>
        <DashboardHeader
            title={translate(CommonLabels, 'Users')}
            onBackClick={onBackClick}
        />

        <Box
            display={"flex"}
            marginBottom={LegendsSize.margin.large}
        >
            <Button
                onClick={onCreateClick}
                leftIcon={<AddIcon />}
                colorScheme="green"
            >
                {translate(FormLabels, "Create user")}
            </Button>
        </Box>

        <UserTable
            users={users}
            isLoading={isLoading}
            onUserEditClick={onEditClick}
            onUserDeleteClick={onDeleteClick}
        />

        <UserDeleteModal
            isLoading={isLoadingDeletion}
            isOpen={deleteModalData.isOpen}
            onClose={onCloseDeleteModal}
            onConfirm={onDeleteUser}
            userId={deleteModalData.userId}
        />
    </Container>
}
