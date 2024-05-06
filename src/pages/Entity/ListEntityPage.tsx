import { Box, Button, Container } from "@chakra-ui/react";
import { useEntityList } from "./hooks/useEntityList";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../Dashboard/Header";
import { EntityTable } from "./EntityTable";
import { AddIcon } from "@chakra-ui/icons";
import { LegendsSize } from "../../styles/constants.style";
import { I18nContext } from "../../contexts/i18n.context";
import { FormLabels } from "../../i18n/forms.i18n";

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
        isLoading
    } = useEntityList()

    const Navigate = useNavigate()

    const onEditClick = useCallback((id: number) => {
        return () => Navigate(`/entity/edit/${id}`)
    }, [Navigate])

    const onRemoveClick = useCallback(() => {
        return () => window.alert("Em breve o modal de confirmação de exclusão será implementado.")
    }, [])

    const onBack = useCallback(() => Navigate("/auth"), [Navigate])

    const onCreate = useCallback(() => Navigate("/entity/create"), [Navigate])

    const { translate } = useContext(I18nContext)

    return (
        <Container maxW={"800px"}>
            <DashboardHeader title="Entidades" onBackClick={onBack} />
            <Box display={"flex"} marginBottom={LegendsSize.margin.large}>
                <Button onClick={onCreate} leftIcon={<AddIcon />} colorScheme="green">
                    {translate(FormLabels, "Create entity")}
                </Button>
            </Box>
            <EntityTable
                entityList={entityList}
                isLoading={isLoading}
                onEntityEditClick={onEditClick}
                onEntityRemoveClick={onRemoveClick}
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
