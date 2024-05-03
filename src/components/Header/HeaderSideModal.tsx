import { Box, Slide } from "@chakra-ui/react";
import { IHeaderSideModalProps } from "./HeaderSideModal.type";

const modalWidth = "300px"

export const HeaderSideModal = ({
    isOpen,
    ref
}: IHeaderSideModalProps) => {
    return (
        <Slide in={isOpen} direction="right" ref={ref as unknown as React.RefObject<HTMLDivElement>}>
            <Box
                bgColor={"red"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                position={"absolute"}
                overflowY={"auto"}
                right={0}
                top={0}
                w={modalWidth}
                h={"100%"}
                maxH="100vh">
                <h1>opened</h1>
            </Box>
        </Slide>
    );
}
