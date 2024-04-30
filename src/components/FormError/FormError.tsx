import { FormHelperText, FormHelperTextProps } from "@chakra-ui/react"
import { useMemo } from "react"
import { LegendsSize } from "../../styles/constants.style"

type IFormErrorProps = {
    errorData: string | null | undefined,
    componentProps?: FormHelperTextProps
}

export const FormError = ({ errorData, componentProps = {} }: IFormErrorProps) => {
    const hasError = useMemo(() => Boolean(errorData), [errorData])
    return hasError ? <FormHelperText color={"#FF3333"} marginBottom={LegendsSize.margin.small} {...componentProps}>{errorData}</FormHelperText> : ""
}
