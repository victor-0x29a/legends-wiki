import { Box, FormLabel, Heading, Input, Switch } from "@chakra-ui/react"
import { LegendsSize } from "../../styles/constants.style"
import { useCallback, useContext, useState } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { FormLabels } from "../../i18n/forms.i18n"

type EntityForImageProps = {
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
    const [isUsingImage, setIsUsingImage] = useState(false)
    const [isUsingInternalImage, setIsUsingInternalImage] = useState(false)

    const onChangeData = useCallback((field: string, valueFromField: string) => {
        onChange({
            ...value,
            [field]: valueFromField
        })
    }, [onChange, value])

    const { translate } = useContext(I18nContext)

    return (
        <Box>
            <Heading size={"md"} marginTop={LegendsSize.margin.normal} marginBottom={LegendsSize.margin.small}>
                Imagem
            </Heading>
            <Box display={"flex"}>
                <Box>
                    <FormLabel display={"inline"}>{translate(FormLabels, "Use image:")}</FormLabel>
                    <Switch onChange={() => setIsUsingImage((curr) => !curr)} isChecked={isUsingImage} disabled={isLoading} />
                </Box>
                {isUsingImage && (
                    <Box marginLeft={LegendsSize.margin.normal}>
                        <FormLabel display={"inline"}>{translate(FormLabels, "Use internal image:")}</FormLabel>
                        <Switch onChange={() => setIsUsingInternalImage((curr) => !curr)} isChecked={isUsingInternalImage} disabled={isLoading} />
                    </Box>
                )}
            </Box>
            {isUsingImage && (
                <Box display="flex" justifyContent={"space-between"} marginTop={LegendsSize.margin.small}>
                    <Box w="45%">
                        <FormLabel>{isUsingInternalImage ? translate(FormLabels, "Name of internal image") : translate(FormLabels, "Link of the image")}</FormLabel>
                        <Input type="text" value={value?.src || ""} onChange={(event) => onChangeData('src', event.target.value)} disabled={isLoading} />
                    </Box>
                    <Box w="45%">
                        <FormLabel>{translate(FormLabels, "Alt of image")}</FormLabel>
                        <Input type="text" value={value?.alt || ""} onChange={(event) => onChangeData('alt', event.target.value)} disabled={isLoading} />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
