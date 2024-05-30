import { Box, Button, Heading } from "@chakra-ui/react"
import { useContext } from "react";
import { TbLocationBroken } from "react-icons/tb";
import { I18nContext } from "./contexts/i18n.context";
import { ErrorList } from "./i18n/errors.i18n";
import { LegendsSize } from "./styles/constants.style";
import { useNavigate } from "react-router-dom";
import { CommonLabels } from "./i18n/commonLabels.i18n";

interface IGenericErrorProps {
    errorDetails?: string
    canShowBackButton?: boolean
}

export const GenericError = ({
    errorDetails,
    canShowBackButton = true
}: IGenericErrorProps) => {
    const { translate } = useContext(I18nContext)
    const Navigate = useNavigate()
    return <Box
        display={"flex"}
        flexDirection={"column"}
        placeContent={"center"}
        placeItems={"center"}
        w="100%"
        h="100%"
    >
        <Box
            display={"flex"}
            placeItems={"center"}
            gap={LegendsSize.margin.normal}
        >
            <TbLocationBroken size={40} />
            <Heading as={"h1"}>
                {translate(ErrorList, errorDetails || "genericError")}
            </Heading>
        </Box>
        {canShowBackButton && (<Box marginTop={LegendsSize.margin.normal}>
            <Button
                fontSize={LegendsSize.fontSize.large}
                onClick={() => Navigate(-1)}
            >
                {translate(CommonLabels, "Back")}
            </Button>
        </Box>)}
    </Box>
}
