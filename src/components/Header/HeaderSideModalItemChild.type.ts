import { TextProps } from "@chakra-ui/react";

export type IHeaderSideModalItemChildProps = {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isMobile: boolean;
    others?: TextProps
}
