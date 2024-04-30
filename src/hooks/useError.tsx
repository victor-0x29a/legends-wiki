import { useCallback, useContext } from "react"
import { I18nContext } from "../contexts/i18n.context"
import { ErrorList } from "../i18n/errors.i18n"

export const useError = () => {
    const { translate } = useContext(I18nContext)

    const translateErrors = useCallback((errorList: string[]) => {
        return errorList.map((error) => translate(ErrorList, error))
    }, [translate])

    return {
        translateErrors
    }
}
