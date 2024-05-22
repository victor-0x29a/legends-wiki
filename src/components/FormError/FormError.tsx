import { FormHelperText, FormHelperTextProps } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import { LegendsSize } from "../../styles/constants.style"
import { I18nContext } from "../../contexts/i18n.context"
import { FormLabels } from "../../i18n/forms.i18n"

type IFormErrorProps = {
    errorData: string | null | undefined,
    componentProps?: FormHelperTextProps
}

export const FormError = ({ errorData, componentProps = {} }: IFormErrorProps) => {
    const { translate } = useContext(I18nContext)
    const hasError = useMemo(() => Boolean(errorData), [errorData])
    return hasError ? (
        <FormHelperText
            color={"#FF3333"}
            marginBottom={LegendsSize.margin.small}
            {...componentProps}
        >
            {translate(FormLabels, errorData!)}
        </FormHelperText>
    ) : ""
}
