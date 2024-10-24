import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { I18nContext } from "./shared/contexts/i18n.context";

import { Box, Button, Heading } from "@chakra-ui/react"

import { TbLocationBroken } from "react-icons/tb";

import { CommonLabels } from "./shared/i18n/commonLabels.i18n";
import { ErrorList } from "./shared/i18n/errors.i18n";

import { LegendsSize } from "./styles/constants.style";

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
