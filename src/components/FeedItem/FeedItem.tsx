import EntityImage from "../EntityImage/EntityImage"

import { Box, Heading, Text } from "@chakra-ui/react"

import { LegendsColor, LegendsSize, LegendsValues } from "../../styles/constants.style"

import type { IFeedItemProps } from "./FeedItem.type"

export const FeedItem = ({
    image,
    title,
    description,
    entityId,
    onClick
}: IFeedItemProps) => {
    return <Box
        display={'flex'}
        padding={LegendsSize.padding.small}
        onClick={() => onClick(entityId)}
        cursor={'pointer'}
        border={`2px solid ${LegendsColor.textColors.gray}`}
        borderRadius={LegendsSize.borderRadius.small}
        transitionDuration={LegendsValues.transitionDuration}
        _hover={{
            border: `2px solid ${LegendsColor.textColors.white}`,
        }}
        id="feed-item"
    >
        <EntityImage image={image} others={{
            width: '120px',
            height: '120px',
        }} />
        <Box w={'100%'} h={'120px'} marginLeft={LegendsSize.margin.small}>
            <Heading
                as="h3"
                size="md"
                marginTop={LegendsSize.margin.small}
            >
                {title}
            </Heading>
            <Text marginTop={LegendsSize.margin.small}>
                {description}
            </Text>
        </Box>
    </Box>
}
