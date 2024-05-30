import { ImageObject } from "../../types/entity.type";

export interface IFeedItemProps {
    image: ImageObject
    title: string
    description: string
    entityId: number
    onClick: (id: string | number) => void
}
