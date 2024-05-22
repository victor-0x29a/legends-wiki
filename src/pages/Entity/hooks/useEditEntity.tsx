import { useCallback, useContext, useState } from "react"
import { useEntity } from "./useEntity"
import { getDifferentKeys } from "../../../api/utils/getDifferentKeys"
import { FindOneEntity } from "../../../types/entity.type"
import { useAlert } from "../../../hooks/useAlert"
import { I18nContext } from "../../../contexts/i18n.context"
import { CommonLabels } from "../../../i18n/commonLabels.i18n"
import { EntityModel } from "../../../api"
import { useNavigate } from "react-router-dom"
import { useError } from "../../../hooks/useError"

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
        translateErrors
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
            .catch((errors) => {
                translateErrors(errors)!
                    .forEach((error) => {
                        alert({ text: error })
                    })
            })
            .finally(() => setIsLoading(false))
    }, [alert, id, onSuccessCallback, originalData, translateErrors])

    return {
        originalData,
        isLoading,
        isLoadingEntity,
        onSubmit: Edit
    }
}
