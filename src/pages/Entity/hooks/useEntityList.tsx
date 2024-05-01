import { useQuery } from "@tanstack/react-query"
import { EntityModel } from "../../../api"
import { useCallback, useState } from "react"
import { ImageObject } from "../../../types/entity.type"

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
    entityList: {
        id: number
        title: string
        image: null | ImageObject
    }[]
    pagination: {
        page: number
        perPage: number
        totalPages: number
    }
}

export const useEntityList = (): IUseEntityList => {
    const [filters, setFilters] = useState({
        page: 1,
        perPage: 10
    })

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
        queryFn: () => EntityModel.list(filters)
    })

    return {
        filters,
        onChangePage,
        onChangePerPage,
        onChangeTitle,
        isLoading: isLoading || isFetching,
        entityList: (data?.entries || []) as { id: number; title: string; image: ImageObject | null; }[],
        pagination: {
            page: data?.page || 1,
            perPage: data?.perPage || 10,
            totalPages: data?.totalPages || 1
        }
    }
}
