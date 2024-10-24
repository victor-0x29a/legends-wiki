import { useCallback, useEffect, useMemo, useState } from "react"

import { Image, ImageProps } from "@chakra-ui/react"

import { LegendsSize } from "../../styles/constants.style"

import type { IEntityImageProps } from "./EntityImage.type"

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
    const [internalImageAttrs, setInternalImageAttrs] = useState<null | { src: string, alt: string }>(null)

    const hasImage = useMemo(() => image !== null, [image])

    const isInternalImage = useMemo(() => {
        return !(image?.src || '').startsWith("https://")
    }, [image?.src])

    const [isFetchingImage, setIsFetchingImage] = useState(false)

    const isValidImage = useMemo(() => {
        if (!hasImage) return false

        if (isInternalImage) return true

        const srcImageIsValid = image!.src.startsWith("http") || image!.src.startsWith("data:image")

        return srcImageIsValid
    }, [hasImage, image, isInternalImage])

    const fetchImage = useCallback(async (fileName: string, imageAlt: string) => {
        if (isFetchingImage) return
        setIsFetchingImage(true)
        try {
            const response = await fetch(`../../src/assets/private-images/${fileName}`);
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setInternalImageAttrs({ src: imageUrl, alt: imageAlt });
        } catch (_error) {
            setInternalImageAttrs(null)
        } finally {
            setIsFetchingImage(false)
        }
    }, [isFetchingImage])

    useEffect(() => {
        if (isInternalImage) {
            fetchImage(image!.src, image!.alt)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInternalImage])

    if (isInternalImage && internalImageAttrs) {
        return <MountedImage src={internalImageAttrs.src} alt={internalImageAttrs.alt} others={others} />
    }

    if (!hasImage) {
        return <MountedImage src="https://via.placeholder.com/150" alt="Any fallback image" others={others} />
    }

    if (hasImage && !isValidImage) {
        return <MountedImage src="https://via.placeholder.com/150" alt="Any fallback image" others={others} />
    }

    return <MountedImage src={image!.src} alt={image!.alt} others={others} />
}

export default EntityImage
