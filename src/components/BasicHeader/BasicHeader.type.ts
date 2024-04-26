export type IBasicHeaderProps = {
    imageDetails: {
        src: string;
        alt: string;
    } | null
    icon?: React.ReactNode
    title: string
    subtitle?: string
    position: 'right' | 'bottom'
    bottomChild?: React.ReactNode
}