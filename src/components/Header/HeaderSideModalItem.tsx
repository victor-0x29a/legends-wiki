import { Box, Heading } from "@chakra-ui/react";

import { HeaderSideModalChild } from "./HeaderSideModalItemChild";
import { IconWrapper } from "../IconWrapper/IconWrapper";

import { CloseIcon } from "@chakra-ui/icons";

import { LegendsColor, LegendsSize } from "../../styles/constants.style";

import type { IHeaderSideModalItemProps } from "./HeaderSideModalItem.type"

export const HeaderSideModalItem = ({
    section,
    sectionChilds,
    isMobile,
    onCloseClick = () => { },
    showCloseIcon = true
}: IHeaderSideModalItemProps) => {
    return (
        <Box position={"relative"}>
            {showCloseIcon && (
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    paddingRight={LegendsSize.padding.normal}
                    paddingTop={LegendsSize.padding.normal}
                    right={0}
                    top={0}
                    position={"absolute"}
                    cursor={"pointer"}
                >
                    <IconWrapper lightMode={true}>
                        <CloseIcon h={5} w={5} onClick={onCloseClick} />
                    </IconWrapper>
                </Box>
            )}
            <Heading
                color={LegendsColor.textColors.emphasis.primary}
                display={"flex"}
                alignItems={"center"}
                fontSize={LegendsSize.fontSize.large}
                paddingLeft={LegendsSize.padding.small}
                marginTop={LegendsSize.margin.normal}
            >
                {section}
            </Heading>
            {sectionChilds.map(({ icon, label, onClick }) => <HeaderSideModalChild
                key={`${label}-header-side-modal`}
                icon={icon}
                label={label}
                onClick={onClick}
                isMobile={isMobile}
            />
            )}
        </Box>
    );
}
