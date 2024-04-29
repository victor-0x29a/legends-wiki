import { FormHelperText, FormHelperTextProps } from "@chakra-ui/react"
import { useMemo } from "react"

type IFormErrorProps = {
    errorData: string | null | undefined,
    componentProps?: FormHelperTextProps
}

export const FormError = ({ errorData, componentProps = {} }: IFormErrorProps) => {
    const hasError = useMemo(() => Boolean(errorData), [errorData])
    return hasError ? <FormHelperText {...componentProps}>{errorData}</FormHelperText> : ""
}
