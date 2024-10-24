import { useCallback, useContext, useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { I18nContext } from "../../shared/contexts/i18n.context";

import { useEntityList } from "./hooks/useEntityList";

import { EntityTable } from "./EntityTable";
import { DashboardHeader } from "../Dashboard/Header";

import { Box, Button, Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { FormLabels } from "../../shared/i18n/forms.i18n";
import { CommonLabels } from "../../shared/i18n/commonLabels.i18n";

import { LegendsSize } from "../../styles/constants.style";

export const ListEntityPage = () => {
    const {
        onChangePage,
        onChangePerPage,
        pagination: {
            page,
            perPage,
            totalPages
        },
        entityList,
        isLoading,
        removeEntity,
        isLoadingDeletion,
        refreshList
    } = useEntityList()

    const Navigate = useNavigate()

    const onEditClick = useCallback((id: number) => {
        return () => Navigate(`/entity/edit/${id}`)
    }, [Navigate])

    const onBack = useCallback(() => Navigate("/auth"), [Navigate])

    const onCreate = useCallback(() => Navigate("/entity/create"), [Navigate])

    const { translate } = useContext(I18nContext)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const refresh = searchParams.get("refresh")

        if (refresh === "true" && !isLoading) {
            refreshList()
            setSearchParams({ refresh: "false" })
        }
    }, [isLoading, refreshList, searchParams, setSearchParams])

    const onRemoveEntity = useCallback((id: number) => {
        return removeEntity(id).finally(() => refreshList())
    }, [refreshList, removeEntity])

    return (
        <Container maxW={"800px"}>
            <DashboardHeader
                title={translate(CommonLabels, "Entities")}
                onBackClick={onBack}
            />
            <Box
                display={"flex"}
                marginBottom={LegendsSize.margin.large}
            >
                <Button
                    onClick={onCreate}
                    leftIcon={<AddIcon />}
                    colorScheme="green"
                >
                    {translate(FormLabels, "Create entity")}
                </Button>
            </Box>
            <EntityTable
                entityList={entityList}
                isLoading={isLoading}
                onEntityEditClick={onEditClick}
                onEntityRemoveClick={onRemoveEntity}
                isLoadingDeletion={isLoadingDeletion}
                paginationProps={{
                    onChangePage,
                    onChangePerPage,
                    page,
                    perPage,
                    totalPages
                }}
            />
        </Container>
    );
}
