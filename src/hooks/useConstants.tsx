import { useContext, useMemo } from "react"
import { I18nContext } from "../contexts/i18n.context"
import { PublicRoutes } from "../data/routes.data"
import { EntityList } from "../i18n/entity.i18n"

export const useContants = () => {
    const { translate } = useContext(I18nContext)

    const RoutesConstant = useMemo(() => {
        const translatedRoutes = PublicRoutes.map((route) => {
            const translatedLabel = translate(EntityList, route.label)

            return {
                ...route,
                label: translatedLabel
            }
        })
        return translatedRoutes
    }, [translate])

    return {
        RoutesConstant
    }
}
