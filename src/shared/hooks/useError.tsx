import { useCallback, useContext } from "react"

import { AuthContext } from "../contexts/auth.context"
import { I18nContext } from "../contexts/i18n.context"

import { useAlert } from "./useAlert"

import { ErrorList } from "../i18n/errors.i18n"

export const useError = () => {
    const { translate } = useContext(I18nContext)

    const { logout } = useContext(AuthContext)

    const { alert } = useAlert()

    const translateErrors = useCallback((errorList: string[], isLogin?: boolean): string[] | void => {
        if (errorList.includes("Required authentication") || errorList.includes("Token not provided.") || errorList.includes("Token invalid.")) {

            if (errorList.includes('Required authentication') && isLogin) {
                return alert({ text: translate(ErrorList, "User or password incorrect") })
            }

            alert({ text: translate(ErrorList, "Required authentication") })
            return logout()
        }
        return errorList.map((error) => translate(ErrorList, error))
    }, [alert, logout, translate])

    return {
        translateErrors
    }
}
