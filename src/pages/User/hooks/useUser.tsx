import { useCallback, useContext, useState } from "react"
import { UserModel } from "../../../api"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"
import { createUserPayload, createUserResponse, editUserPayload, User } from "../../../types/user.type"
import { identity } from "../../../types/app.type"
import { useNavigate } from "react-router-dom"
import { I18nContext } from "../../../contexts/i18n.context"
import { CommonLabels } from "../../../i18n/commonLabels.i18n"

interface IUseUser {
    isLoadingDeletion: boolean
    deleteUser: (id: number, callback?: identity) => void
    isLoadingVisualization: boolean
    findUser: (id: number) => void
    user: User | null
    isLoadingCreation: boolean
    createUser: (data: createUserPayload, callback?: identity) => void
    createdUser: createUserResponse | null
    editUser: (id: number, data: editUserPayload, callback?: identity) => void
    isLoadingEdition: boolean
}

export const useUser = (): IUseUser => {
    const [isLoading, setIsLoading] = useState({
        deletion: false,
        visualization: false,
        creation: false,
        edition: false
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

    const Navigate = useNavigate()

    const {
        translate
    } = useContext(I18nContext)

    const callbackWhenIdIsNotValid = useCallback(() => {
        Navigate("/users")
        alert({ text: translate(CommonLabels, "User not found") })
    }, [Navigate, alert, translate])

    const deleteUser = useCallback((id: number, callback = () => { }) => {
        setIsLoading((curr) => ({ ...curr, deletion: true }))
        return UserModel.delete(id)
            .then(() => callback())
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading({ ...isLoading, deletion: false }))
    }, [alert, isLoading, translateErrors])

    const findUser = useCallback((id: number) => {
        if (!id || isNaN(id)) {
            return callbackWhenIdIsNotValid()
        }

        setIsLoading((curr) => ({ ...curr, visualization: true }))
        UserModel.findOne(id)
            .then((data) => setResponse((curr) => ({ ...curr, user: data })))
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading((curr) => ({ ...curr, visualization: false })))
    }, [alert, callbackWhenIdIsNotValid, translateErrors])

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

    const editUser = useCallback((id: number, data: editUserPayload, callback = () => { }) => {
        setIsLoading((curr) => ({ ...curr, edition: true }))
        UserModel.edit(id, data)
            .then(() => callback())
            .catch((errors) => {
                const translatedErrors = translateErrors(errors)!
                translatedErrors && translatedErrors
                    .forEach((error) => alert({ text: error }))
            })
            .finally(() => setIsLoading((curr) => ({ ...curr, edition: false })))
    }, [alert, translateErrors])

    return {
        isLoadingDeletion: isLoading.deletion,
        deleteUser,
        isLoadingVisualization: isLoading.visualization,
        findUser,
        user: response.user,
        isLoadingCreation: isLoading.creation,
        createUser,
        createdUser: response.createdUser,
        editUser,
        isLoadingEdition: isLoading.edition
    }
}
