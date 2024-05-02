import { Heading, Container, Box, Text, Button } from "@chakra-ui/react";
import { LegendsColor, LegendsSize } from "./styles/constants.style";
import { WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const NotFound = () => {
    const Navigate = useNavigate()

    const onClick = useCallback(() => Navigate("/"), [Navigate])

    return (
        <Container maxW={1920} display={"flex"} justifyContent={"center"} h={"100vh"} flexDirection={"column"}>
            <Container maxW={"600px"} padding={LegendsSize.padding.normal} borderRadius={LegendsSize.borderRadius.small} border={'1px'}>
                <Box display={"flex"} justifyContent={"center"}>
                    <WarningIcon boxSize={14} marginBottom={LegendsSize.margin.normal} />
                </Box>
                <Heading as="h2" size={"lg"} color={LegendsColor.textColors.white} textAlign={"center"}>
                    Conteúdo não encontrado.
                </Heading>
                <Text marginTop={LegendsSize.margin.small} marginBottom={LegendsSize.margin.small}>
                    O conteúdo que você está procurando não foi encontrado, foi removido ou está em manutenção.
                </Text>
                <Button w={"100%"} colorScheme="green" onClick={onClick}>
                    Voltar
                </Button>
            </Container>
        </Container>
    );
}
