import { useContext, useMemo } from "react"
import { I18nContext } from "../contexts/i18n.context"
import { PrivateRoutes, PublicRoutes } from "../data/routes.data"
import { EntityList } from "../i18n/entity.i18n"
import { CommonLabels } from "../i18n/commonLabels.i18n"

export const useContants = () => {
    const { translate } = useContext(I18nContext)

    const PrivateRoutesConstant = useMemo(() => {
        const translatedPrivateRoutes = PrivateRoutes.map((route) => {
            const translatedLabel = translate(CommonLabels, route.label)

            return {
                ...route,
                label: translatedLabel
            }
        })
        return translatedPrivateRoutes
    }, [translate])

    const PublicRoutesConstant = useMemo(() => {
        const translatedPublicRoutes = PublicRoutes.map((route) => {
            const translatedLabel = translate(EntityList, route.label)

            return {
                ...route,
                label: translatedLabel
            }
        })
        return translatedPublicRoutes
    }, [translate])

    return {
        PublicRoutesConstant,
        PrivateRoutesConstant
    }
}
