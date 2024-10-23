import { useCallback, useContext, useState } from "react"

import { useNavigate } from "react-router-dom"

import { EntityModel } from "../../../api"

import { I18nContext } from "../../../shared/contexts/i18n.context"

import { useEntity } from "./useEntity"
import { useError } from "../../../shared/hooks/useError"
import { useAlert } from "../../../shared/hooks/useAlert"

import { getDifferentKeys } from "../../../api/utils/getDifferentKeys"

import { CommonLabels } from "../../../shared/i18n/commonLabels.i18n"

import type { FindOneEntity } from "../../../types/entity.type"

interface useEditEntityProps {
    isLoading: boolean
    isLoadingEntity: boolean
    onSubmit: (data: Record<string, unknown>) => void
    originalData: FindOneEntity
}

export const useEditEntity = (id: number): useEditEntityProps => {
    const [isLoading, setIsLoading] = useState(false)

    const Navigate = useNavigate()

    const {
        alert
    } = useAlert()

    const {
        showErrors
    } = useError()

    const {
        translate
    } = useContext(I18nContext)

    const {
        entity: originalData,
        isLoading: isLoadingEntity
    } = useEntity(id)

    const onSuccessCallback = useCallback(() => {
        Navigate(-1)
        alert({
            text: translate(CommonLabels, "Entity has updated"),
            type: "success"
        })
    }, [Navigate, alert, translate])

    const Edit = useCallback((data: Record<string, unknown>) => {
        setIsLoading(true)

        const payload = getDifferentKeys(originalData as unknown as Record<string, unknown>, data)

        const hasPayload = Object.keys(payload).length > 0

        if (!hasPayload) {
            setIsLoading(false)
            return onSuccessCallback()
        }

        EntityModel.edit(Number(id), payload)
            .then(() => {
                onSuccessCallback()
            })
            .catch(showErrors)
            .finally(() => setIsLoading(false))
    }, [id, onSuccessCallback, originalData, showErrors])

    return {
        originalData,
        isLoading,
        isLoadingEntity,
        onSubmit: Edit
    }
}
