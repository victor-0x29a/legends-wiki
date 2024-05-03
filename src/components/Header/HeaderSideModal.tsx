import { Box, Fade, Slide, useMediaQuery } from "@chakra-ui/react";
import { IHeaderSideModalProps } from "./HeaderSideModal.type";
import { LegendsColor } from "../../styles/constants.style";
import { HeaderSideModalItem } from "./HeaderSideModalItem";
import { useContants } from "../../hooks/useConstants";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { I18nContext } from "../../contexts/i18n.context";
import { EntityList } from "../../i18n/entity.i18n";

export const HeaderSideModal = ({
    isOpen,
    ref
}: IHeaderSideModalProps) => {
    const { RoutesConstant } = useContants()

    const Navigate = useNavigate()

    const parsedRoutesConstant = useMemo(() => {
        return RoutesConstant.map((route) => {
            return {
                icon: route.icon,
                label: route.label,
                onClick: () => Navigate(route.path)
            }
        })
    }, [RoutesConstant, Navigate])

    const { translate } = useContext(I18nContext)

    const isMobile = useMediaQuery("(min-width: 768px)")

    const modalWidth = useMemo(() => {
        if (isMobile) return "100%"
        return "300px"
    }, [isMobile])
    return (
        <Slide
            ref={ref as unknown as React.RefObject<HTMLDivElement>}
            in={isOpen}
            direction="right"
            transition={{
                exit: { delay: 0.4 }
            }}>
            <Box
                bgColor={LegendsColor.backgroundColors.secondary}
                display={"flex"}
                flexDirection={"column"}
                position={"absolute"}
                overflowY={"auto"}
                right={0}
                top={0}
                w={modalWidth}
                h={"100%"}
                maxH="100vh"
                zIndex={101}
                color={LegendsColor.textColors.black}>
                <HeaderSideModalItem
                    section={translate(EntityList, "Geral")}
                    sectionChilds={parsedRoutesConstant}
                    isMobile={Boolean(isMobile)}
                />
            </Box>
            <Fade in={isOpen} transition={{
                enter: { delay: 0.3 },
                exit: { delay: 0.2 }
            }}>
                <Box zIndex={100} width={'100vw'} height={'100vh'} backgroundColor={"rgba(0, 0,0, 0.4)"} />
            </Fade>
        </Slide>
    );
}
