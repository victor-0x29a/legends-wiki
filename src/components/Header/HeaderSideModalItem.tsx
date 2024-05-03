import { Box, Text } from "@chakra-ui/react";
import { IHeaderSideModalItemProps } from "./HeaderSideModalItem.type"
import { LegendsColor, LegendsSize } from "../../styles/constants.style";
import { HeaderSideModalChild } from "./HeaderSideModalItemChild";


export const HeaderSideModalItem = ({
    section,
    sectionChilds,
    isMobile
}: IHeaderSideModalItemProps) => {
    return (
        <Box>
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
