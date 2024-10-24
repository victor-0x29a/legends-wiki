import { useCallback, useContext, useMemo } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { DashboardContainer } from "../Dashboard/Container"
import { FeedContainer } from "./FeedContainer/FeedContainer"

import { EntityList } from "../../shared/i18n/entity.i18n"

import { GenericError } from "../../generic-error"

import { Entities } from "../../entity.constant"

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
        {!canShowHeader && <GenericError errorDetails="Unknown entity" canShowBackButton={false} />}
        {canShowHeader && (
            <FeedContainer
                entityType={entityType!}
                onEntityClick={RedirectForEntity}
            />
        )}
    </DashboardContainer>
}
