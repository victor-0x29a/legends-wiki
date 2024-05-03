import { Box, Fade, Slide } from "@chakra-ui/react";
import { IHeaderSideModalProps } from "./HeaderSideModal.type";
import { LegendsColor } from "../../styles/constants.style";

const modalWidth = "300px"

export const HeaderSideModal = ({
    isOpen,
    ref
}: IHeaderSideModalProps) => {
    return (
        <Slide in={isOpen} direction="right">
            <Box
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                bgColor={LegendsColor.backgroundColors.secondary}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                position={"absolute"}
                overflowY={"auto"}
                right={0}
                top={0}
                w={modalWidth}
                h={"100%"}
                maxH="100vh"
                zIndex={101}>
                <h1>opened</h1>
            </Box>
            <Fade in={isOpen} transition={{
                enter: { delay: 0.3 },
                exit: { delay: 0.5 }
            }}>
                <Box zIndex={100} width={'100vw'} height={'100vh'} backgroundColor={"rgba(0, 0,0, 0.4)"} />
            </Fade>
        </Slide>
    );
}
