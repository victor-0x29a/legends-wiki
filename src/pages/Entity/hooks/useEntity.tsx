import { useQuery } from "@tanstack/react-query"

import { EntityModel } from "../../../api"

import { useError } from "../../../shared/hooks/useError"

import { Environment } from "../../../constants"

import type { FindOneEntity } from "../../../types/entity.type"

const STALE_TIME = Environment.isTest ? 500 : 1000 * 60 * 5

type IUseEntity = {
    isLoading: boolean
    entity: FindOneEntity
}

export const useEntity = (entityId: number, canFetch: boolean = true): IUseEntity => {
    const {
        showErrors
    } = useError()

    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        staleTime: STALE_TIME,
        queryKey: [JSON.stringify({ entityId, label: 'entity-unique-view' })],
        queryFn: async () => {
            if (isNaN(entityId) || !canFetch) {
                return Promise.resolve(null)
            }

            const data = await EntityModel.findOne(entityId)
                .catch(showErrors)

            return data
        }
    })

    return {
        isLoading: isLoading || isFetching,
        entity: data as unknown as FindOneEntity
    }
}
