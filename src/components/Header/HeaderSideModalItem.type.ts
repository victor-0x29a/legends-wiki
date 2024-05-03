export type IHeaderSideModalItemProps = {
    section: string
    sectionIcon: React.ReactNode
    sectionChilds: {
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }[]
}
