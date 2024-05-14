import { useParams } from "react-router-dom"
import { Entities } from "../../constants"
import { NotFound } from "../../not-found"
import { useEntity } from "./hooks/useEntity"
import { Box } from "@chakra-ui/react"
import BasicHeader from "../../components/BasicHeader"
import { LegendsSize } from "../../styles/constants.style"
import StatsInfo from "../../components/StatsInfo"
import { IItemStats } from "../../types/item.type"
import { useMemo } from "react"
import MDEditor from "@uiw/react-md-editor"

export const ViewEntityPage = () => {
    const { type, id } = useParams()

    const { entity, isLoading } = useEntity(Number(id))

    const canCenterStats = useMemo(() => Object.keys(entity?.properties || {}).length < 3, [entity?.properties])

    if (!type || !Entities.includes(type)) {
        return <NotFound />
    }

    if (isLoading) {
        return 'is loading'
    }

    return <Box paddingTop={LegendsSize.padding.normal}>
        <BasicHeader
            title={entity?.title}
            imageDetails={entity?.image}
            position="right"
            subtitle={entity.description} />

        <StatsInfo
            stats={entity.properties as unknown as IItemStats}
            isCentralized={canCenterStats} />

        <MDEditor.Markdown source={entity?.sections || ''} />
    </Box>
}
