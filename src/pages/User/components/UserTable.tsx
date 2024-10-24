import { useCallback, useContext } from "react"

import { useNavigate } from "react-router-dom"

import { I18nContext } from "../../../shared/contexts/i18n.context"

import { Spinner, Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

import { CommonLabels } from "../../../shared/i18n/commonLabels.i18n"
import { FormLabels } from "../../../shared/i18n/forms.i18n"

import { LegendsColor, LegendsSize } from "../../../styles/constants.style"

import type { IUserTableProps } from './UserTable.type'

export const UserTable = ({
    users,
    isLoading,
    onUserEditClick,
    onUserDeleteClick
}: IUserTableProps) => {
    const Navigate = useNavigate()

    const { translate } = useContext(I18nContext)

    const mountRedirectLink = useCallback((id: number) => () => Navigate(`/users/${id}`), [Navigate])

    return <Table>
        <Thead>
            <Tr>
                <Th color={LegendsColor.textColors.white}>
                    ID
                </Th>
                <Th color={LegendsColor.textColors.white}>
                    {translate(CommonLabels, 'User')}
                </Th>
                <Th color={LegendsColor.textColors.white}>
                    {translate(CommonLabels, 'Name')}
                </Th>
                <Th color={LegendsColor.textColors.white}>
                    {translate(FormLabels, 'Actions')}
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {isLoading ? (
                <Tr>
                    <Th colSpan={12} textAlign={"center"}>
                        <Spinner width={16} height={16} />
                        <Text
                            marginTop={LegendsSize.margin.normal}
                            fontSize={LegendsSize.fontSize.normal}>
                            {translate(CommonLabels, "Loading users")}
                        </Text>
                    </Th>
                </Tr>
            ) : (
                users.map((user) => {
                    return <Tr key={`user-tr-${user.id}`}>
                        <Th
                            color={LegendsColor.textColors.gray}
                            cursor={"pointer"}
                            onClick={mountRedirectLink(user.id)}
                        >
                            {user.id}
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            {user.username}
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            {user.name}
                        </Th>
                        <Th>
                            <EditIcon
                                onClick={() => onUserEditClick(user.id)} marginRight={LegendsSize.margin.small}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                            <DeleteIcon
                                onClick={() => onUserDeleteClick(user.id)}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                        </Th>
                    </Tr>
                })
            )}
        </Tbody>
    </Table>
}
