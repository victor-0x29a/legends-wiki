import { Environment } from "../../../constants"
import { useQuery } from "@tanstack/react-query"
import { UserModel } from "../../../api"
import { findAllUsersResponse } from "../../../types/user.type"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"

interface IUseUserList {
    users: findAllUsersResponse
    isLoading: boolean
}

const STALE_TIME = Environment.isTest ? 0 : 1000 * 60 * 2

export const useUserList = (): IUseUserList => {
    const {
        translateErrors
    } = useError()

    const {
        alert
    } = useAlert()

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
        queryKey: ["find-users-key"]
    })

    return {
        users: data as findAllUsersResponse,
        isLoading: isLoading || isFetching
    }
}
