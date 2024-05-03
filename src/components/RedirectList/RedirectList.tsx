import { Box, Card, CardHeader, Heading } from "@chakra-ui/react"
import { IRedirectListProps } from "./RedirectList.type"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { Link } from "react-router-dom"
import { InfoOutlineIcon } from "@chakra-ui/icons"

export const RedirectList = ({
    list
}: IRedirectListProps) => {
    return <Box display={"flex"} justifyContent={"center"} gap={LegendsSize.margin.normal} marginTop={LegendsSize.margin.normal} cursor={"pointer"} position={"relative"} zIndex={1}>
        {list.map(({ title, path }, index) => (
            <Link to={path} key={`redirect-page-${index}-#${path}`}>
                <Card padding={"0"} backgroundColor={"transparent"} boxShadow={`0 0 4px ${LegendsColor.textColors.white}`} minW={"200px"} maxW={"200px"} borderRadius={LegendsSize.borderRadius.small}>
                    <CardHeader w={"100%"} h={"100%"} textAlign={"center"}>
                        <Heading as="h4" size={"sm"}>
                            <InfoOutlineIcon boxSize={4} display={"inline"} marginRight={LegendsSize.margin.small} />
                            {title}
                        </Heading>
                    </CardHeader>
                </Card>
            </Link>
        ))}
    </Box>
}
