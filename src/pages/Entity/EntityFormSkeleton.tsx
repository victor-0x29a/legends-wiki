import { Box, Skeleton } from "@chakra-ui/react"
import { LegendsSize } from "../../styles/constants.style"

const skeletonSequence = [
    ["100%", "100px"], ["100%", "1rem"], ["100%", "50px"],
    ["100%", "1rem"], ["100%", "50px"], ["100%", "1rem"],
    ["100%", "1rem"], ["100%", "80px"]
]

export const EntityFormSkeleton = () => {
    return <Box w="100%">
        {skeletonSequence.map((skeletonSizes, index) => (
            <Skeleton
                marginTop={LegendsSize.margin.normal}
                marginBottom={LegendsSize.margin.normal}
                width={skeletonSizes[0]}
                height={skeletonSizes[1]}
                key={`entity-form-skeleton-base-#${index}`}
            />
        ))}
    </Box>
}
