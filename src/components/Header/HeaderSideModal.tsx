import { Box, Fade, Slide, useMediaQuery } from "@chakra-ui/react";
import { IHeaderSideModalProps } from "./HeaderSideModal.type";
import { LegendsColor } from "../../styles/constants.style";
import { HeaderSideModalItem } from "./HeaderSideModalItem";
import { useContants } from "../../hooks/useConstants";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { I18nContext } from "../../contexts/i18n.context";
import { EntityList } from "../../i18n/entity.i18n";
import { CommonLabels } from "../../i18n/commonLabels.i18n";

export const HeaderSideModal = ({
    isOpen,
    reference,
    toggleModal
}: IHeaderSideModalProps) => {
    const { PublicRoutesConstant, PrivateRoutesConstant } = useContants()

    const Navigate = useNavigate()

    const parsedPublicRoutesConstant = useMemo(() => {
        return PublicRoutesConstant.map((route) => {
            return {
                icon: route.icon,
                label: route.label,
                onClick: () => Navigate(route.path)
            }
        })
    }, [PublicRoutesConstant, Navigate])

    const parsedPrivateRoutesConstant = useMemo(() => {
        return PrivateRoutesConstant.map((route) => {
            return {
                icon: route.icon,
                label: route.label,
                onClick: () => Navigate(route.path)
            }
        })
    }, [PrivateRoutesConstant, Navigate])

    const { translate } = useContext(I18nContext)

    const isMobile = useMediaQuery("(max-width: 768px)")[0]

    const modalWidth = useMemo(() => {
        if (isMobile) return "100%"
        return "300px"
    }, [isMobile])
    return (
        <>
            {!isMobile && isOpen && <Fade
                in={isOpen}
                transition={{
                    enter: { delay: 0.3 },
                    exit: { delay: 0.2 }
                }}
                style={{
                    zIndex: 99,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}>
                <Box zIndex={100} width={'100vw'} height={'100vh'} backgroundColor={"rgba(0, 0,0, 0.4)"} />
            </Fade>}
            <Slide
                in={isOpen}
                direction="right"
                transition={{
                    exit: { delay: 0.4, duration: 1 },
                }}
                style={{
                    zIndex: 100
                }}>
                <Box
                    ref={reference as unknown as React.RefObject<HTMLDivElement>}
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
                        sectionChilds={parsedPublicRoutesConstant}
                        isMobile={isMobile}
                        onCloseClick={toggleModal}
                    />
                    <HeaderSideModalItem
                        section={translate(CommonLabels, "Admin")}
                        sectionChilds={parsedPrivateRoutesConstant}
                        isMobile={isMobile}
                        onCloseClick={toggleModal}
                        showCloseIcon={false}
                    />
                </Box>
            </Slide>
        </>
    );
}
