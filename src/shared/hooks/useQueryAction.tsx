import { useSearchParams } from "react-router-dom"
import { identity } from "../../types/app.type"
import { useEffect } from "react"

type IUseQueryAction = {
    queryKey: string
    queryValue: string
    queryAction: identity
    inactivatedValue: string
}

export const useQueryAction = ({
    queryKey,
    queryValue,
    inactivatedValue,
    queryAction
}: IUseQueryAction) => {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get(queryKey) === queryValue) {
            queryAction()
            setSearchParams(new URLSearchParams({
                ...searchParams,
                [queryKey]: inactivatedValue
            }))
        }
    }, [searchParams, queryKey, queryValue, queryAction, setSearchParams, inactivatedValue])
}
