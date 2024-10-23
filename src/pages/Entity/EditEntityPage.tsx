import { useContext } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { useEditEntity } from "./hooks/useEditEntity"

import { EntityForm, initialValuesEntityForm } from "./form/EntityForm"
import { EntityFormSkeleton } from "./form/EntityFormSkeleton"

import { DashboardHeader } from "../Dashboard/Header"

import { Box } from "@chakra-ui/react"

import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"

export const EditEntityPage = () => {
    const { id } = useParams()

    const { translate } = useContext(I18nContext)

    const Navigate = useNavigate()

    const {
        isLoading,
        onSubmit,
        originalData,
        isLoadingEntity
        // @ts-expect-error - Expect a number but is a string
    } = useEditEntity(id)

    return <Box>
        <DashboardHeader
            title={translate(CommonLabels, "Edit entity")}
            onBackClick={() => Navigate(-1)}
        />
        {isLoadingEntity ? (
            <EntityFormSkeleton />
        ) : (
            <EntityForm
                initialValues={originalData as initialValuesEntityForm}
                onSubmit={(data) => onSubmit(data as unknown as Record<string, unknown>)}
                isLoading={isLoading}
                isEdition={true}
            />
        )}
    </Box>
}
