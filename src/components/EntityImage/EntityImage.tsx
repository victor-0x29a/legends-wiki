import { Image, ImageProps } from "@chakra-ui/react"
import { IEntityImageProps } from "./EntityImage.type"
import { useMemo } from "react"
import { LegendsSize } from "../../styles/constants.style"

const MountedImage = ({
    src,
    alt,
    others
}: {
    src: string
    alt: string
    others?: ImageProps
}) => {
    return <Image src={src} alt={alt} borderRadius={LegendsSize.borderRadius.small} boxSize={20} objectFit={"cover"} {...others} />
}

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
        return <MountedImage src="https://via.placeholder.com/150" alt="Any fallback image" />
    }

    if (hasImage && !isValidImage) {
        return <MountedImage src="https://via.placeholder.com/150" alt="Any fallback image" />
    }

    return <MountedImage src={image!.src} alt={image!.alt} others={others} />
}

export default EntityImage
