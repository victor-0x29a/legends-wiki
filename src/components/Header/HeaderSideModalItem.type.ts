export type IHeaderSideModalItemProps = {
    isMobile: boolean
    section: string
    sectionChilds: {
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }[]
    onCloseClick: () => void
    showCloseIcon?: boolean
}
