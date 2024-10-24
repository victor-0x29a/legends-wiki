import { useContext, useMemo } from "react"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { Box, Container, useMediaQuery } from "@chakra-ui/react"
import { DashboardHeader } from "./Header"
import { DashboardSideBar } from "./Sidebar"

import { Entities } from "../../entity.constant"
import { DASHBOARD_SIDE_MODAl_SIZE } from "./Dashboard.constant"

import { EntityList } from "../../shared/i18n/entity.i18n"
import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"

import { LegendsSize } from "../../styles/constants.style"

import { PublicRoutes } from "../../shared/data/routes.data"

import type { EntityView, IDashboardContainerProps } from "./dashboard.type"

export const DashboardContainer = ({
    headerTitle,
    onHeaderBackClick,
    showHeader = false,
    children,
    onEntityTypeChange
}: IDashboardContainerProps) => {
    const { translate } = useContext(I18nContext)

    const isMobile = useMediaQuery(`(max-width: ${LegendsSize.breakpoints.mobile})`)?.[0]

    const boxWidth = useMemo(() => isMobile ? `calc(100% - ${DASHBOARD_SIDE_MODAl_SIZE}px)` : '100%', [isMobile])

    const entityList = useMemo<EntityView[]>(() => {
        const filteredEntityRoutes = PublicRoutes.filter(({ path }) => [...Entities, ""].includes(path.replace("/", "")))

        const parsedEntityRoutes = filteredEntityRoutes.map(({ label, path, icon }) => {
            const hasInEntityList = Boolean(EntityList?.[label])
            return {
                label: hasInEntityList ? translate(EntityList, label) : translate(CommonLabels, label),
                icon,
                onClick: () => onEntityTypeChange(path.replace("/", ""))
            }
        })

        return parsedEntityRoutes
    }, [onEntityTypeChange, translate])

    return <Container
        maxW={"initial"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        padding={0}
        margin={0}
    >
        <DashboardSideBar entityList={entityList} isMobile={isMobile} />
        <Box
            w={boxWidth}
            maxH={"100%"}
            margin={0}
            padding={0}
            overflow={"auto"}
        >
            {showHeader && (
                <DashboardHeader
                    onBackClick={onHeaderBackClick!}
                    title={headerTitle!}
                />
            )}
            {children}
        </Box>
    </Container>
}
