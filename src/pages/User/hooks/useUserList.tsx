import { Environment } from "../../../constants"
import { useQuery } from "@tanstack/react-query"
import { UserModel } from "../../../api"
import { findAllUsersResponse } from "../../../types/user.type"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"
import { useCallback, useState } from "react"

interface IUseUserList {
    users: findAllUsersResponse
    isLoading: boolean
    refreshRequest: () => void
}

const STALE_TIME = Environment.isTest ? 0 : 1000 * 60 * 2

export const useUserList = (): IUseUserList => {
    const {
        translateErrors
    } = useError()

    const {
        alert
    } = useAlert()

    const [queryKey, setQueryKey] = useState(0)

    const refreshRequest = useCallback(() => setQueryKey((curr) => curr + 1), [])

    const {
        isLoading,
        isFetching,
        data
    } = useQuery({
        staleTime: STALE_TIME,
        queryFn: () => {
            return UserModel.findAll()
                .catch((errors) => {
                    translateErrors(errors)!
                        .forEach((error) => alert({ text: error }))
                })
        },
        queryKey: [`find-users-key-${queryKey}`]
    })

    return {
        users: data as findAllUsersResponse,
        isLoading: isLoading || isFetching,
        refreshRequest
    }
}
