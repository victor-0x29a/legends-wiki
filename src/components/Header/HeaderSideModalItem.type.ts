export type IHeaderSideModalItemProps = {
    section: string
    sectionChilds: {
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }[]
}
