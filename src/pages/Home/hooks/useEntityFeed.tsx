import { useCallback, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { EntityModel } from "../../../api"

import { Environment } from "../../../constants"
import { Entities } from "../../../entity.constant"

const STALE_TIME = Environment.isTest ? 500 : 1000 * 60 * 5

export const useEntityFeed = (entityType: string) => {
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })

    const onChangePage = useCallback((page: number) => {
        setPagination((prev) => ({ ...prev, page }))
    }, [])

    const onChangePerPage = useCallback((perPage: number) => {
        setPagination((prev) => ({ ...prev, perPage }))
    }, [])

    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: [JSON.stringify({ pagination, type: entityType }) + "entity-feed"],
        staleTime: STALE_TIME,
        queryFn: () => {
            if (!Entities.includes(entityType)) return null
            return EntityModel.list({
                page: pagination.page,
                perPage: pagination.perPage,
                type: entityType
            })
        }
    })

    return {
        isLoading: isLoading || isFetching,
        onChangePage,
        onChangePerPage,
        entities: data?.entries || [],
        page: pagination.page,
        perPage: pagination.perPage,
        totalPages: data?.totalPages || 0
    }
}
