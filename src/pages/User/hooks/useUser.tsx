import { useCallback, useState } from "react"
import { UserModel } from "../../../api"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"

interface IUseUser {
    isLoadingDeletion: boolean
    deleteUser: (id: number) => void
}

export const useUser = (): IUseUser => {
    const [isLoading, setIsLoading] = useState({
        deletion: false
    })

    const {
        translateErrors
    } = useError()

    const {
        alert
    } = useAlert()

    const deleteUser = useCallback((id: number) => {
        UserModel.delete(id)
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading({ ...isLoading, deletion: false }))
    }, [alert, isLoading, translateErrors])

    return {
        isLoadingDeletion: isLoading.deletion,
        deleteUser
    }
}
