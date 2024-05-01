import { ImageProps } from "@chakra-ui/react"
import { ImageObject } from "../../types/entity.type"

export type IEntityImageProps = {
    image: ImageObject | null
    others?: ImageProps
}
