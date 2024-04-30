import { Box, Container, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { useContext, useMemo } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { RedirectList } from "../../components/RedirectList/RedirectList"

export const AuditSection = () => {
    const mockedData = ["A row", "A second row"]

    return <Box display={"flex"} flexDirection={"column"} w={"100%"} marginTop={LegendsSize.margin.normal}>
        <Table>
            <Thead>
                <Tr>
                    <Th color={LegendsColor.textColors.white}>
                        Auditoria
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

    const redirectList = [
        {
            title: "Entidades",
            path: "/entity"
        },
        {
            title: "Usuários",
            path: "/users"
        },
        {
            title: "Meu Perfil",
            path: `/users/${username}`
        }
    ]

    return <Container maxW={"800px"}>
        <RedirectList list={redirectList} />
        <AuditSection />
    </Container>
}
