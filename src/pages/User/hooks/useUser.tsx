import { useCallback, useState } from "react"
import { UserModel } from "../../../api"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"
import { createUserPayload, createUserResponse, User } from "../../../types/user.type"

interface IUseUser {
    isLoadingDeletion: boolean
    deleteUser: (id: number) => void
    isLoadingVisualization: boolean
    findUser: (id: number) => void
    user: User | null
    isLoadingCreation: boolean
    createUser: (data: createUserPayload) => void
    createdUser: createUserResponse | null
}

export const useUser = (): IUseUser => {
    const [isLoading, setIsLoading] = useState({
        deletion: false,
        visualization: false,
        creation: false
    })

    const [response, setResponse] = useState<{
        user: null | User,
        createdUser: null | createUserResponse
    }>({
        user: null,
        createdUser: null
    })

    const {
        translateErrors
    } = useError()

    const {
        alert
    } = useAlert()

    const deleteUser = useCallback((id: number, callback = () => { }) => {
        setIsLoading((curr) => ({ ...curr, deletion: true }))
        UserModel.delete(id)
            .then(() => callback())
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading({ ...isLoading, deletion: false }))
    }, [alert, isLoading, translateErrors])

    const findUser = useCallback((id: number) => {
        setIsLoading((curr) => ({ ...curr, visualization: true }))
        UserModel.findOne(id)
            .then((data) => setResponse((curr) => ({ ...curr, user: data })))
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading((curr) => ({ ...curr, visualization: false })))
    }, [alert, translateErrors])

    const createUser = useCallback((data: createUserPayload, callback = () => { }) => {
        setIsLoading((curr) => ({ ...curr, creation: true }))
        return UserModel.create(data)
            .then((data) => {
                setResponse((curr) => ({
                    ...curr,
                    createdUser: data
                }))
                callback()
            })
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading((curr) => ({ ...curr, creation: false })))
    }, [alert, translateErrors])

    return {
        isLoadingDeletion: isLoading.deletion,
        deleteUser,
        isLoadingVisualization: isLoading.visualization,
        findUser,
        user: response.user,
        isLoadingCreation: isLoading.creation,
        createUser,
        createdUser: response.createdUser
    }
}
