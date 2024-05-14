import { useQuery } from "@tanstack/react-query"
import { EntityModel } from "../../../api"
import { FindOneEntity } from "../../../types/entity.type"
import { useError } from "../../../hooks/useError"
import { useAlert } from "../../../hooks/useAlert"

const STALE_TIME = 1000 * 60 * 2

type IUseEntity = {
    isLoading: boolean
    entity: FindOneEntity
}

export const useEntity = (entityId: number): IUseEntity => {
    const {
        translateErrors
    } = useError()

    const {
        alert
    } = useAlert()

    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        staleTime: STALE_TIME,
        queryKey: [JSON.stringify({ entityId, label: 'entity-unique-view' })],
        queryFn: async () => {
            if (isNaN(entityId)) {
                return Promise.resolve(null)
            }

            const data = await EntityModel.findOne(entityId)
                .catch((errors) => translateErrors(errors)!.forEach((error) => {
                    alert({ text: error })
                }))

            return data
        }
    })

    return {
        isLoading: isLoading || isFetching,
        entity: data as unknown as FindOneEntity
    }
}
