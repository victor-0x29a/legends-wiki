import { Box, Fade, Slide } from "@chakra-ui/react";
import { IHeaderSideModalProps } from "./HeaderSideModal.type";
import { LegendsColor } from "../../styles/constants.style";
import {
    HiArchive,
    HiEye,
} from "react-icons/hi"
import { HeaderSideModalItem } from "./HeaderSideModalItem";

const modalWidth = "300px"

export const HeaderSideModal = ({
    isOpen,
    ref
}: IHeaderSideModalProps) => {
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
                    section="Geral"
                    sectionIcon={<HiArchive size={40} />}
                    sectionChilds={[
                        {
                            icon: <HiEye size={20} />,
                            label: "Usuários",
                            onClick: () => { }
                        }
                    ]} />
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
