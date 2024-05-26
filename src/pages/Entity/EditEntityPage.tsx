import { useNavigate, useParams } from "react-router-dom"
import { EntityForm, initialValuesEntityForm } from "./form/EntityForm"
import { useEditEntity } from "./hooks/useEditEntity"
import { EntityFormSkeleton } from "./form/EntityFormSkeleton"
import { DashboardHeader } from "../Dashboard/Header"
import { Box } from "@chakra-ui/react"
import { useContext } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { CommonLabels } from "../../i18n/commonLabels.i18n"

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
                onSubmit={onSubmit}
                isLoading={isLoading}
                isEdition={true}
            />
        )}
    </Box>
}
