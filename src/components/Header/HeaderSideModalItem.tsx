import { Box, Text, useBoolean } from "@chakra-ui/react";
import { IHeaderSideModalItemProps } from "./HeaderSideModalItem.type"
import { LegendsColor, LegendsSize, LegendsValues } from "../../styles/constants.style";
import { IconWrapper } from "../IconWrapper/IconWrapper";

const HeaderSideModalChild = ({ onClick, icon, label }: {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) => {
    const [isHover, setIsHover] = useBoolean()
    return <Text as="span"
        onClick={onClick}
        display={"flex"}
        color={LegendsColor.textColors.black}
        alignItems={"center"}
        gap={"6px"}
        paddingLeft={LegendsSize.padding.large}
        fontSize={LegendsSize.fontSize.large}
        userSelect={"none"}
        cursor={"pointer"}
        transition={`background-color ${LegendsValues.transitionDuration}, color ${LegendsValues.transitionDuration}`}
        _hover={{
            bgColor: LegendsColor.backgroundColors.primary,
            color: LegendsColor.textColors.white,
        }}
        onMouseEnter={setIsHover.on}
        onMouseLeave={setIsHover.off}
    >
        <IconWrapper lightMode={!isHover}>
            {icon}
        </IconWrapper>
        {label}
    </Text>
}

export const HeaderSideModalItem = ({
    section,
    sectionIcon,
    sectionChilds
}: IHeaderSideModalItemProps) => {
    return (
        <Box>
            <Text
                color={LegendsColor.textColors.black}
                display={"flex"}
                alignItems={"center"}
                fontSize={LegendsSize.fontSize.large}
                paddingLeft={LegendsSize.padding.small}
            >
                <IconWrapper lightMode={true}>
                    {sectionIcon}
                </IconWrapper>
                {section}
            </Text>
            {sectionChilds.map(({ icon, label, onClick }) => <HeaderSideModalChild key={`${label}-header-side-modal`} icon={icon} label={label} onClick={onClick} />
            )}
        </Box>
    );
}
