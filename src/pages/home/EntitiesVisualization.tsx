import { Box, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { NotFound } from "../../not-found"
import { Entities } from "../../constants"

export const EntitiesVisualization = () => {
    const { entityType } = useParams()

    if (!entityType || !Entities.includes(entityType)) {
        return <NotFound />
    }

    return <Box>
        <Text>Entities Visualization</Text>
    </Box>
}
