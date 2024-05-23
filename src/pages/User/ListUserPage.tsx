import { Box, Button, Container } from "@chakra-ui/react"
import { useUserList } from "./hooks/useUserList"
import { useContext, useMemo, useState } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { CommonLabels } from "../../i18n/commonLabels.i18n"
import { UserTable } from "./UserTable"
import { DashboardHeader } from "../Dashboard/Header"
import { useNavigate } from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons"
import { LegendsSize } from "../../styles/constants.style"
import { FormLabels } from "../../i18n/forms.i18n"
import { UserDeleteModal } from "./UserDeleteModal"
import { useUser } from "./hooks/useUser"

export const ListUserPage = () => {
    const Navigate = useNavigate()

    const {
        isLoading,
        users
    } = useUserList()

    const {
        deleteUser,
        isLoadingDeletion
    } = useUser()

    const {
        translate
    } = useContext(I18nContext)

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
        onEditClick: (id: number) => Navigate(`/users/${id}`),
        onDeleteClick: (id: number) => setDeleteModalData({ isOpen: true, userId: id }),
        onCloseDeleteModal: () => setDeleteModalData((curr) => ({ ...curr, isOpen: false, })),
        onBackClick: () => Navigate(-1)
    }), [Navigate])

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
            onConfirm={deleteUser}
            userId={deleteModalData.userId}
        />
    </Container>
}
