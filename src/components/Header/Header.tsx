import { useCallback, useContext, useRef, useState } from "react";

import { I18nContext } from "../../shared/contexts/i18n.context";

import { useOutsideClick } from "@chakra-ui/react";

import { Select } from "../Select";
import { HeaderSideModal } from "./HeaderSideModal";
import { IconWrapper } from "../IconWrapper/IconWrapper";

import { Box, Fade, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiCaretDown } from "react-icons/bi";

import { I18nLanguages } from "../../constants";

import { I18nStyle } from "./Header.styles";
import { HEADER_HEIGHT, LegendsColor, LegendsSize } from "../../styles/constants.style";

import Logo from "../../assets/logo.png";

import type { language } from "../../types/i18n.type";

export const Header = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const toggleModal = useCallback(() => setIsOpenModal((curr) => !curr), [])

    const modalReference = useRef<HTMLDivElement>()

    useOutsideClick({
        ref: modalReference as React.RefObject<HTMLElement>,
        handler: toggleModal,
        enabled: isOpenModal
    })

    const { onChangeLocale } = useContext(I18nContext)

    const onLanguageSelect = useCallback((value: string) => {
        const lang = value as unknown as language
        onChangeLocale(lang)
    }, [onChangeLocale])

    return (
        <Box
            as="header"
            w={"100%"}
            h={HEADER_HEIGHT}
            padding={LegendsSize.padding.small}
            display={"flex"}
            bgColor={LegendsColor.backgroundColors.secondary}
            boxShadow={`0 0 10px ${LegendsColor.backgroundColors.secondary}`}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Image
                src={Logo}
                alt="Legends logo"
                objectFit={"cover"}
                width={"120px"}
            />
            <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                gap="1rem"
            >
                <Box display={"inline-block"}>
                    <Select
                        options={I18nLanguages}
                        onSelect={onLanguageSelect}
                        placeholder="I18N"
                        others={{
                            variant: "filled",
                            bgColor: 'transparent',
                            css: I18nStyle,
                            placeholder: undefined,
                            icon: (<IconWrapper lightMode={true}>
                                <BiCaretDown />
                            </IconWrapper>),
                            cursor: "pointer",
                            id: "i18n-select"
                        }}
                    />
                </Box>
                <Fade in={!isOpenModal}>
                    <IconWrapper lightMode={true}>
                        <HamburgerIcon
                            w={'2rem'}
                            h={'2rem'}
                            cursor={"pointer"}
                            onClick={toggleModal}
                        />
                    </IconWrapper>
                </Fade>
            </Box>
            <HeaderSideModal
                isOpen={isOpenModal}
                reference={modalReference as React.RefObject<HTMLElement>}
                toggleModal={() => setIsOpenModal(false)}
            />
        </Box>
    );
}
