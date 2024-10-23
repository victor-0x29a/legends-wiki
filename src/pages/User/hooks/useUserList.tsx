import { useCallback, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { UserModel } from "../../../api"

import { useError } from "../../../shared/hooks/useError"

import { Environment } from "../../../constants"

import type { IUseUserList } from './useUserList.type'
import type { findAllUsersResponse } from "../../../types/user.type"

const STALE_TIME = Environment.isTest ? 0 : 1000 * 60 * 2

export const useUserList = (): IUseUserList => {
    const {
        showErrors
    } = useError()

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
                .catch(showErrors)
        },
        queryKey: [`find-users-key-${queryKey}`]
    })

    return {
        users: data as findAllUsersResponse,
        isLoading: isLoading || isFetching,
        refreshRequest
    }
}
