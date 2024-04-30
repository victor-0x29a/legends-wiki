import { useCallback, useContext } from "react"
import { I18nContext } from "../contexts/i18n.context"
import { ErrorList } from "../i18n/errors.i18n"
import { AuthContext } from "../contexts/auth.context"
import { useAlert } from "./useAlert"

export const useError = () => {
    const { translate } = useContext(I18nContext)

    const { logout } = useContext(AuthContext)

    const { alert } = useAlert()

    const translateErrors = useCallback((errorList: string[]) => {
        if (errorList.includes("Required authentication") || errorList.includes("Token not provided.") || errorList.includes("Token invalid.")) {
            alert({ text: translate(ErrorList, "Required authentication") })
            return logout()
        }
        return errorList.map((error) => translate(ErrorList, error))
    }, [alert, logout, translate])

    return {
        translateErrors
    }
}
