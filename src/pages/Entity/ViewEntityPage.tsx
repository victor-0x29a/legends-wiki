import { useNavigate, useParams } from "react-router-dom"
import { Entities } from "../../constants"
import { NotFound } from "../../not-found"
import { useEntity } from "./hooks/useEntity"
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"
import BasicHeader from "../../components/BasicHeader"
import { LegendsSize } from "../../styles/constants.style"
import StatsInfo from "../../components/StatsInfo"
import { IItemStats } from "../../types/item.type"
import { useMemo } from "react"
import MDEditor from "@uiw/react-md-editor"
import { DashboardHeader } from "../Dashboard/Header"

const DEFAULT_CONTAINER_PROPS = {
    paddingTop: LegendsSize.padding.normal,
}

export const ViewEntityPage = () => {
    const Navigate = useNavigate()

    const { type, id } = useParams()

    const { entity, isLoading } = useEntity(Number(id))

    const canCenterStats = useMemo(() => Object.keys(entity?.properties || {}).length < 3, [entity?.properties])

    if (!type || !Entities.includes(type)) {
        return <NotFound />
    }

    if (isLoading) {
        return <Box {...DEFAULT_CONTAINER_PROPS}>
            <Box display={"flex"} >
                <Skeleton height={"50px"} w="100px" h={"100px"} borderRadius={LegendsSize.padding.normal} />
                <Box>
                    <Skeleton height={"1rem"} w={"10rem"} marginTop={"1rem"} marginLeft={"0.5rem"} />
                    <Skeleton height={"1rem"} w={"30rem"} marginTop={"1rem"} marginLeft={"0.5rem"} />
                </Box>
            </Box>
            <Box display={"flex"} gap="1rem" paddingTop={"1rem"} paddingBottom={"1rem"}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`skeleton-stats-info-${index}`} style={{ listStyle: "none" }}>
                        <Skeleton height={"1rem"} w={"10rem"} />
                    </li>
                ))}
            </Box>
            <SkeletonText noOfLines={5} lineHeight={"1rem"} />
        </Box>
    }

    return <Box {...DEFAULT_CONTAINER_PROPS}>
        <DashboardHeader onBackClick={() => Navigate(-1)} title={"Visualizando"} />
        <BasicHeader
            title={entity?.title}
            imageDetails={(entity?.image || { src: '', alt: '' })}
            position="right"
            subtitle={entity?.description} />

        <StatsInfo
            stats={(entity?.properties || {}) as unknown as IItemStats}
            isCentralized={canCenterStats} />

        <MDEditor.Markdown source={entity?.sections || ''} style={{
            padding: LegendsSize.padding.normal,
            borderRadius: LegendsSize.borderRadius.normal
        }} />
    </Box>
}
