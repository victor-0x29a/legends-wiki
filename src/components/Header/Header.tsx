import { Box, Fade, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { LegendsColor, LegendsSize } from "../../styles/constants.style";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { useCallback, useRef, useState } from "react";
import { HeaderSideModal } from "./HeaderSideModal";
import { useOutsideClick } from "@chakra-ui/react";


export const Header = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const toggleModal = useCallback(() => setIsOpenModal((curr) => !curr), [])

    const modalReference = useRef<HTMLDivElement>()

    useOutsideClick({
        ref: modalReference as React.RefObject<HTMLElement>,
        handler: () => toggleModal(),
        enabled: isOpenModal
    })

    return (
        <Box as="header" w={"100%"} padding={LegendsSize.padding.small} display={"flex"} bgColor={LegendsColor.backgroundColors.secondary} boxShadow={`0 0 10px ${LegendsColor.backgroundColors.secondary}`} justifyContent={"space-between"} alignItems={"center"}>
            <Image src={Logo} alt="Legends logo" objectFit={"cover"} width={"120px"} />
            <Fade in={!isOpenModal}>
                <IconWrapper lightMode={true}>
                    <HamburgerIcon w={'2rem'} h={'2rem'} cursor={"pointer"} onClick={toggleModal} />
                </IconWrapper>
            </Fade>
            <HeaderSideModal isOpen={isOpenModal} ref={modalReference as React.RefObject<HTMLElement>} />
        </Box>
    );
}
