/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import { ContainerStyled } from "./IconWrapper.style";
import { IIconWrapperProps } from "./IconWrapper.type";
import { useMemo } from "react";

export const IconWrapper = ({ children, lightMode = false, customCss }: IIconWrapperProps) => {
    const style = useMemo(() => `
        ${ContainerStyled(lightMode)}
        ${customCss ? customCss : ''}
    `, [customCss, lightMode])
    return (
        <Box css={style as unknown as any}>
            {children}
        </Box>
    );
}
