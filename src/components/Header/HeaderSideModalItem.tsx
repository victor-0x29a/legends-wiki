import { Box, Text } from "@chakra-ui/react";
import { IHeaderSideModalItemProps } from "./HeaderSideModalItem.type"
import { LegendsColor, LegendsSize } from "../../styles/constants.style";
import { HeaderSideModalChild } from "./HeaderSideModalItemChild";
import { CloseIcon } from "@chakra-ui/icons";
import { IconWrapper } from "../IconWrapper/IconWrapper";


export const HeaderSideModalItem = ({
    section,
    sectionChilds,
    isMobile,
    onCloseClick = () => { }
}: IHeaderSideModalItemProps) => {
    return (
        <Box position={"relative"}>
            <Box display={"flex"} justifyContent={"flex-end"} paddingRight={LegendsSize.padding.normal} paddingTop={LegendsSize.padding.normal} right={0} top={0} position={"absolute"} cursor={"pointer"}>
                <IconWrapper lightMode={true}>
                    <CloseIcon h={5} w={5} onClick={onCloseClick} />
                </IconWrapper>
            </Box>
            <Text
                color={LegendsColor.textColors.emphasis.primary}
                display={"flex"}
                alignItems={"center"}
                fontSize={LegendsSize.fontSize.large}
                paddingLeft={LegendsSize.padding.small}
            >
                {section}
            </Text>
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
