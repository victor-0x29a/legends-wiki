import { IconWrapper } from "../IconWrapper/IconWrapper";

import { Text, useBoolean } from "@chakra-ui/react";

import { LegendsColor, LegendsSize, LegendsValues } from "../../styles/constants.style";

import type { IHeaderSideModalItemChildProps } from "./HeaderSideModalItemChild.type";

export const HeaderSideModalChild = ({ onClick, icon, label, isMobile, others = {} }: IHeaderSideModalItemChildProps) => {
    const [isHover, setIsHover] = useBoolean()
    return <Text
        as="span"
        onClick={onClick}
        display={"flex"}
        color={LegendsColor.textColors.emphasis.secondary}
        alignItems={"center"}
        gap={"6px"}
        paddingLeft={LegendsSize.padding.large}
        fontSize={LegendsSize.fontSize.large}
        userSelect={"none"}
        cursor={"pointer"}
        transition={`background-color ${LegendsValues.transitionDuration}, color ${LegendsValues.transitionDuration}`}
        marginTop={LegendsSize.margin.normal}
        marginBottom={LegendsSize.margin.normal}
        width={isMobile ? "90%" : "80%"}
        textAlign={"center"}
        marginLeft={LegendsSize.margin.normal}
        borderRadius={LegendsSize.borderRadius.large}
        _hover={{
            bgColor: LegendsColor.textColors.emphasis.primary,
            color: LegendsColor.textColors.white
        }}
        _focus={{
            bgColor: LegendsColor.textColors.emphasis.primary,
            color: LegendsColor.textColors.white
        }}
        onMouseEnter={setIsHover.on}
        onMouseLeave={setIsHover.off}
        {...others}
    >
        <IconWrapper lightMode={!isHover}>
            {icon}
        </IconWrapper>
        {label}
    </Text>
}
