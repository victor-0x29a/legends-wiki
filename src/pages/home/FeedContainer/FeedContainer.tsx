import { List, ListItem } from "@chakra-ui/react"
import { IFeedContainerProps } from "./FeedContainer.type"
import { PaginationBar } from "../../../components/PaginationBar/PaginationBar"
import { useEntityFeed } from "../hooks/useEntityFeed"
import { FeedItem } from "../../../components/FeedItem/FeedItem"
import { ImageObject } from "../../../types/entity.type"
import { LegendsSize } from "../../../styles/constants.style"
import { useMemo } from "react"

export const FeedContainer = ({ entityType, onEntityClick }: IFeedContainerProps) => {
    const {
        entities,
        isLoading,
        page,
        perPage,
        totalPages,
        onChangePage,
        onChangePerPage
    } = useEntityFeed(entityType)

    const canShowPagination = useMemo(() => entities.length > 0, [entities])

    return <>
        <List display={"flex"} flexDirection={"column"} id="feed-container">
            {entities.map((entity) => (
                <ListItem
                    padding={LegendsSize.padding.normal}
                    key={`feed-item-${entityType}-${entity.id}`}
                >
                    <FeedItem
                        entityId={entity.id}
                        title={entity.title}
                        description={entity.description}
                        image={entity.image as ImageObject}
                        onClick={onEntityClick}
                    />
                </ListItem>
            ))}
        </List>
        {canShowPagination && (
            <PaginationBar
                page={page}
                isLoading={isLoading}
                perPage={perPage}
                onChangePage={onChangePage}
                totalPages={totalPages}
                onChangePerPage={onChangePerPage}
            />
        )}
    </>
}
