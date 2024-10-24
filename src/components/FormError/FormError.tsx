import { useContext, useMemo } from "react"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { FormHelperText } from "@chakra-ui/react"

import { FormLabels } from "../../shared/i18n/forms.i18n"

import { LegendsSize } from "../../styles/constants.style"

import "./FormError.scss"

import type { IFormErrorProps } from './FormError.type'

export const FormError = ({ errorData, componentProps = {} }: IFormErrorProps) => {
    const { translate } = useContext(I18nContext)
    const hasError = useMemo(() => Boolean(errorData), [errorData])

    if (!errorData) return null

    return <FormHelperText
        color={"#FF3333"}
        marginBottom={LegendsSize.margin.small}
        className={[
            "form-error",
            hasError && "form-error__visible"
        ].join(" ")}
        {...componentProps}
    >
        {translate(FormLabels, errorData!)}
    </FormHelperText>
}
