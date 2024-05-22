import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import { LegendsSize } from "../../styles/constants.style";

type IHeaderProps = {
    title: string;
    onBackClick: () => void;
}

export const DashboardHeader = ({ title, onBackClick }: IHeaderProps) => {
    return <Box
        display={"flex"}
        w={"100%"}
        padding={LegendsSize.padding.large}
        paddingLeft={0}
        alignItems={"center"}
    >
        <ArrowBackIcon
            marginBottom={LegendsSize.margin.small}
            marginRight={LegendsSize.margin.normal}
            onClick={onBackClick}
            boxSize={8}
            cursor={"pointer"}
        />
        <Heading as={"h1"}>
            {title}
        </Heading>
    </Box>
}
