import { useNavigate, useParams } from "react-router-dom"
import { NotFound } from "../../not-found"
import { Entities } from "../../entity.constant"
import { DashboardContainer } from "../Dashboard/Container"
import { useCallback, useContext, useMemo } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { EntityList } from "../../i18n/entity.i18n"
import { FeedContainer } from "./FeedContainer/FeedContainer"

export const EntitiesVisualization = () => {
    const { entityType } = useParams()

    const { translate } = useContext(I18nContext)

    const Navigate = useNavigate()

    const Redirect = useCallback((path: string) => {
        Navigate(`../${path}`)
    }, [Navigate])

    const RedirectForEntity = useCallback((id: string | number) => {
        Navigate(`../entity/${entityType}/${id}`)
    }, [Navigate, entityType])

    const canShowHeader = useMemo<boolean>(() => Entities.includes(entityType!), [entityType])

    return <DashboardContainer
        showHeader={canShowHeader}
        onEntityTypeChange={Redirect}
        headerTitle={translate(EntityList, entityType!)}
        onHeaderBackClick={() => Navigate(-1)}
    >
        {!canShowHeader && <NotFound />}
        {canShowHeader && (
            <FeedContainer
                entityType={entityType!}
                onEntityClick={RedirectForEntity}
            />
        )}
    </DashboardContainer>
}
