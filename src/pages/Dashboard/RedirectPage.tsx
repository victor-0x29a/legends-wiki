import { useContext, useMemo } from "react"

import { AuthContext } from "../../shared/contexts/auth.context"
import { I18nContext } from "../../shared/contexts/i18n.context"

import { RedirectList } from "../../components/RedirectList/RedirectList"

import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"

import { LegendsColor, LegendsSize } from "../../styles/constants.style"

import { FormLabels } from "../../shared/i18n/forms.i18n"
import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"

export const AuditSection = () => {
    const mockedData = ["A row", "A second row"]

    const { translate } = useContext(I18nContext)

    return <Box display={"flex"} flexDirection={"column"} w={"100%"} marginTop={LegendsSize.margin.normal}>
        <Table>
            <Thead>
                <Tr>
                    <Th color={LegendsColor.textColors.white}>
                        {translate(FormLabels, "Audit")}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {mockedData.map((data, index) => (
                    <Tr key={`audit-log-${index}`}>
                        <Th color={LegendsColor.textColors.gray}>
                            {data}
                        </Th>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </Box>
}

export const RedirectPage = () => {
    const {
        userData
    } = useContext(AuthContext)

    const username = useMemo(() => userData?.username || "", [userData])

    const { translate } = useContext(I18nContext)

    const redirectList = [
        {
            title: translate(CommonLabels, "Entities"),
            path: "/entity"
        },
        {
            title: translate(CommonLabels, "Users"),
            path: "/users"
        },
        {
            title: translate(CommonLabels, "My profile"),
            path: `/users/${username}`
        }
    ]

    return <>
        <RedirectList list={redirectList} />
        <AuditSection />
    </>
}
