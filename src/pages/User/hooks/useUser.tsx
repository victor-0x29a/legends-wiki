import { useCallback, useState } from "react"
import { UserModel } from "../../../api"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"
import { User } from "../../../types/user.type"

interface IUseUser {
    isLoadingDeletion: boolean
    deleteUser: (id: number) => void
    isLoadingVisualization: boolean
    findUser: (id: number) => void
    user: User | null
}

export const useUser = (): IUseUser => {
    const [isLoading, setIsLoading] = useState({
        deletion: false,
        visualization: false
    })

    const [response, setResponse] = useState<{
        user: null | User
    }>({
        user: null
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

    const findUser = useCallback((id: number) => {
        UserModel.findOne(id)
            .then((data) => setResponse((curr) => ({ ...curr, user: data })))
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading({ ...isLoading, visualization: false }))
    }, [alert, isLoading, translateErrors])

    return {
        isLoadingDeletion: isLoading.deletion,
        deleteUser,
        isLoadingVisualization: isLoading.visualization,
        findUser,
        user: response.user
    }
}
