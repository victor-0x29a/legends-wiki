import { Heading, Container, Box, Text, Button } from "@chakra-ui/react";
import { LegendsColor, LegendsSize } from "./styles/constants.style";
import { WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
import { I18nContext } from "./contexts/i18n.context";
import { CommonLabels } from "./i18n/commonLabels.i18n";

export const NotFound = () => {
    const Navigate = useNavigate()

    const onClick = useCallback(() => Navigate("/"), [Navigate])

    const { translate } = useContext(I18nContext)

    return (
        <Container maxW={"100%"} display={"flex"} justifyContent={"center"} h={"100%"} flexDirection={"column"}>
            <Container maxW={"600px"} padding={LegendsSize.padding.normal} borderRadius={LegendsSize.borderRadius.small} border={'1px'} marginTop={"20%"}>
                <Box display={"flex"} justifyContent={"center"}>
                    <WarningIcon boxSize={14} marginBottom={LegendsSize.margin.normal} />
                </Box>
                <Heading as="h2" size={"lg"} color={LegendsColor.textColors.white} textAlign={"center"}>
                    {translate(CommonLabels, "Content not found")}
                </Heading>
                <Text marginTop={LegendsSize.margin.small} marginBottom={LegendsSize.margin.small}>
                    {translate(CommonLabels, "Content not found text")}
                </Text>
                <Button w={"100%"} colorScheme="green" onClick={onClick}>
                    {translate(CommonLabels, "Back")}
                </Button>
            </Container>
        </Container>
    );
}
