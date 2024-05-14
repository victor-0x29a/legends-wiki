import { useQuery } from "@tanstack/react-query"
import { EntityModel } from "../../../api"
import { useCallback, useContext, useState } from "react"
import { MinimalEntity } from "../../../types/entity.type"
import { useAlert } from "../../../hooks/useAlert"
import { I18nContext } from "../../../contexts/i18n.context"
import { FormLabels } from "../../../i18n/forms.i18n"
import { useError } from "../../../hooks/useError"

const STALE_TIME = 1000 * 60 * 10

type IUseEntityList = {
    filters: {
        page: number
        perPage: number
        title?: string
    }
    onChangePage: (page: number) => void
    onChangePerPage: (perPage: number) => void
    onChangeTitle: (title: string) => void
    isLoading: boolean
    isLoadingDeletion: boolean
    entityList: MinimalEntity[]
    pagination: {
        page: number
        perPage: number
        totalPages: number
    }
    removeEntity: (id: number) => Promise<void>
    refreshList: () => void
}

export const useEntityList = (): IUseEntityList => {
    const [filters, setFilters] = useState({
        page: 1,
        perPage: 10,
        refresh: false
    })

    const refreshList = useCallback(() => setFilters((curr) => ({ ...curr, refresh: !curr.refresh })), [])

    const onChangePage = useCallback((page: number) => {
        setFilters((curr) => ({ ...curr, page }))
    }, [])

    const onChangePerPage = useCallback((perPage: number) => {
        setFilters((curr) => ({ ...curr, perPage }))
    }, [])

    const onChangeTitle = useCallback((title: string) => {
        setFilters((curr) => ({ ...curr, title }))
    }, [])

    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: [JSON.stringify({
            screen: "entity-list",
            ...filters
        })],
        queryFn: () => EntityModel.list(filters),
        staleTime: STALE_TIME
    })

    const { translate } = useContext(I18nContext)

    const { alert } = useAlert()

    const { translateErrors } = useError()

    const [isLoadingDeletion, setIsLoadingDeletion] = useState(false)

    const removeEntity = useCallback(async (id: number) => {
        setIsLoadingDeletion(true)
        return EntityModel.delete(id)
            .then(() => {
                alert({ text: translate(FormLabels, "Deleted entity"), type: "success" })
            })
            .catch((error) => {
                translateErrors(error)!
                    .forEach((error) => alert({ text: error, type: "error" }))
            })
            .finally(() => setIsLoadingDeletion(false))
    }, [alert, translate, translateErrors])

    return {
        filters,
        onChangePage,
        onChangePerPage,
        onChangeTitle,
        isLoading: isLoading || isFetching,
        isLoadingDeletion,
        removeEntity,
        entityList: (data?.entries || []) as MinimalEntity[],
        pagination: {
            page: filters.page || 1,
            perPage: filters.perPage || 10,
            totalPages: data?.totalPages || 1
        },
        refreshList
    }
}
