import { Box, FormLabel, Heading, Input, Switch } from "@chakra-ui/react"
import { LegendsSize } from "../../../styles/constants.style"
import { useCallback, useContext, useMemo, useState } from "react"
import { I18nContext } from "../../../contexts/i18n.context"
import { FormLabels } from "../../../i18n/forms.i18n"
import { EntityFormImageListModal } from "./EntityFormImageListModal"
import { IconWrapper } from "../../../components/IconWrapper/IconWrapper"
import { InfoIcon } from "@chakra-ui/icons"
import { IconWrapperCustomCss } from "./EntityFormImageStyles"

interface EntityForImageProps {
    onChange: (value: object) => void,
    value: {
        src: string,
        alt: string
    } | null,
    isLoading?: boolean
}

export const EntityFormImage = ({
    onChange,
    value,
    isLoading = false
}: EntityForImageProps) => {
    const [isUsingImage, setIsUsingImage] = useState<boolean>(Boolean(value))

    const defaultValueIsUsingImage = useMemo(() => {
        if (!value) return false

        const spplitedSrc = value.src.split(".")

        return spplitedSrc.length == 2
    }, [value])

    const [isUsingInternalImage, setIsUsingInternalImage] = useState(defaultValueIsUsingImage)

    const onChangeData = useCallback((field: string, valueFromField: string) => {
        onChange({
            ...value,
            [field]: valueFromField
        })
    }, [onChange, value])

    const { translate } = useContext(I18nContext)

    const [isOpennedModalOfFiles, setIsOpennedModalOfFiles] = useState(false)

    const toggleModalOfFiles = useCallback(() => setIsOpennedModalOfFiles((curr) => !curr), [])

    return (
        <Box>
            <Heading
                size={"md"}
                marginTop={LegendsSize.margin.normal}
                marginBottom={LegendsSize.margin.small}
            >
                {translate(FormLabels, "Image")}
                <IconWrapper customCss={IconWrapperCustomCss}>
                    <InfoIcon
                        onClick={toggleModalOfFiles}
                        cursor={"pointer"}
                        id="entity-image-info-icon-01"
                    />
                </IconWrapper>
            </Heading>
            <Box display={"flex"}>
                <Box>
                    <FormLabel display={"inline"}>
                        {translate(FormLabels, "Use image:")}
                    </FormLabel>
                    <Switch
                        onChange={() => setIsUsingImage((curr) => !curr)}
                        isChecked={isUsingImage}
                        disabled={isLoading}
                    />
                </Box>
                {isUsingImage && (
                    <Box marginLeft={LegendsSize.margin.normal}>
                        <FormLabel display={"inline"}>
                            {translate(FormLabels, "Use internal image:")}
                        </FormLabel>
                        <Switch
                            onChange={() => setIsUsingInternalImage((curr) => !curr)}
                            isChecked={isUsingInternalImage}
                            disabled={isLoading}
                        />
                    </Box>
                )}
            </Box>
            {isUsingImage && (
                <Box
                    display="flex"
                    justifyContent={"space-between"}
                    marginTop={LegendsSize.margin.small}
                >
                    <Box w="45%">
                        <FormLabel id="entity-image-label-01">
                            {isUsingInternalImage ? translate(FormLabels, "Name of internal image") : translate(FormLabels, "Link of the image")}
                        </FormLabel>
                        <Input
                            type="text"
                            value={value?.src || ""}
                            onChange={(event) => onChangeData('src', event.target.value)}
                            disabled={isLoading}
                            id="entity-image-input-01"
                        />
                    </Box>
                    <Box w="45%">
                        <FormLabel>
                            {translate(FormLabels, "Alt of image")}
                        </FormLabel>
                        <Input
                            type="text"
                            value={value?.alt || ""}
                            onChange={(event) => onChangeData('alt', event.target.value)}
                            disabled={isLoading}
                            id="entity-image-input-02"
                        />
                    </Box>
                </Box>
            )}
            <EntityFormImageListModal
                isOpennedModalOfFiles={isOpennedModalOfFiles} toggleModalOfFiles={toggleModalOfFiles}
            />
        </Box>
    )
}
