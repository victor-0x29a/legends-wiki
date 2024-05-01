import { Image, Text } from "@chakra-ui/react"
import { IEntityImageProps } from "./EntityImage.type"
import { useMemo } from "react"
import { LegendsSize } from "../../styles/constants.style"

const EntityImage = ({ image, others = {} }: IEntityImageProps) => {
    const hasImage = useMemo(() => image !== null, [image])
    const isValidImage = useMemo(() => {
        if (!hasImage) return false

        const spplitedSrc = image!.src.split(" ")

        const finalSrc = spplitedSrc[0].split(".")?.[1]

        const imageExtensions = ["svg", "png", "jpg", "jpeg", "gif", "webp", "bmp", "ico"]

        const isComponentImage = spplitedSrc.length === 1 && (imageExtensions.includes(finalSrc) || false)

        if (isComponentImage) return true

        const srcImageIsValid = image!.src.startsWith("http") || image!.src.startsWith("data:image")

        return srcImageIsValid
    }, [hasImage, image])

    if (!hasImage) {
        return <Text fontSize={LegendsSize.fontSize.small}>
            Nenhuma imagem
        </Text>
    }

    if (hasImage && !isValidImage) {
        return <Text fontSize={LegendsSize.fontSize.small}>
            Imagem inválida
        </Text>
    }

    return <Image borderRadius={LegendsSize.borderRadius.small} boxSize={20} objectFit={"cover"} src={image!.src} alt={image!.alt} {...others} />
}

export default EntityImage
