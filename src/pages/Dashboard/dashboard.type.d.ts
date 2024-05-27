export interface EntityView {
    icon: ReactNode,
    label: string,
    onClick: () => void
}

export interface IDashboardSideBarProps {
    entityList: EntityView[]
    isMobile: boolean
}

export interface IDashboardContainerProps {
    showHeader?: boolean
    headerTitle?: string
    onHeaderBackClick?: () => void
    children: ReactNode
    onEntityTypeChange: (entityType: string) => void
}
