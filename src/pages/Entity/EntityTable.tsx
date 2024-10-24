import { useCallback, useContext, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { I18nContext } from "../../shared/contexts/i18n.context";

import EntityImage from "../../components/EntityImage/EntityImage";
import { EntityDeleteModal } from "./EntityDeleteModal";
import { PaginationBar } from "../../components/PaginationBar/PaginationBar";

import { Box, Spinner, Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";

import { FormLabels } from "../../shared/i18n/forms.i18n";

import { LegendsColor, LegendsSize } from "../../styles/constants.style";

import type { MinimalEntity } from "../../types/entity.type";

type IEntityTableProps = {
    isLoading: boolean;
    isLoadingDeletion: boolean;
    entityList: MinimalEntity[]
    onEntityEditClick: (id: number) => () => void
    onEntityRemoveClick: (id: number) => Promise<void>,
    paginationProps: {
        onChangePage: (page: number) => void;
        onChangePerPage: (perPage: number) => void;
        page: number;
        perPage: number;
        totalPages: number;
    }
}

export const EntityTable = ({
    isLoading,
    entityList,
    onEntityEditClick,
    onEntityRemoveClick,
    paginationProps,
    isLoadingDeletion
}: IEntityTableProps) => {
    const Navigate = useNavigate()

    const hasEntities = useMemo(() => entityList.length > 0, [entityList])

    const { translate } = useContext(I18nContext)

    const translateLabel = useCallback((label: string) => translate(FormLabels, label), [translate])

    const [entitySelected, setEntitySelected] = useState<number | null>(null)

    const hasEntitySelected = useMemo(() => entitySelected !== null, [entitySelected])

    const clearEntitySelected = useCallback(() => setEntitySelected(null), [])

    const onDelete = useCallback((id: number) => {
        onEntityRemoveClick(id)
            .then(() => {
                clearEntitySelected()
            })
    }, [clearEntitySelected, onEntityRemoveClick])

    const mountRedirectLink = useCallback((id: number, type: string) => () => {
        Navigate(`/entity/${type}/${id}`)
    }, [Navigate])

    return <>
        <Table>
            <Thead>
                <Tr>
                    <Th color={LegendsColor.textColors.white}>
                        ID
                    </Th>
                    <Th color={LegendsColor.textColors.white}>
                        {translateLabel("Image")}
                    </Th>
                    <Th color={LegendsColor.textColors.white}>
                        {translateLabel("Title")}
                    </Th>
                    <Th color={LegendsColor.textColors.white}>
                        {translateLabel("Actions")}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {isLoading && (
                    <Tr>
                        <Th colSpan={12} textAlign={"center"}>
                            <Spinner width={16} height={16} />
                            <Text
                                marginTop={LegendsSize.margin.normal}
                                fontSize={LegendsSize.fontSize.normal}>
                                {translateLabel("Loading entities")}
                            </Text>
                        </Th>
                    </Tr>
                )}
                {!isLoading && entityList.map(({ id, title, image, type }) => (
                    <Tr key={`item-${id}-entity-list-page`}>
                        <Th
                            color={LegendsColor.textColors.gray}
                            onClick={mountRedirectLink(id, type)}
                            cursor={"pointer"}
                        >
                            {id}
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            <EntityImage image={image} />
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            {title}
                        </Th>
                        <Th>
                            <EditIcon
                                onClick={onEntityEditClick(id)} marginRight={LegendsSize.margin.small}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                            <DeleteIcon
                                onClick={() => setEntitySelected(id)}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                        </Th>
                    </Tr>
                ))}
            </Tbody>
        </Table>
        <EntityDeleteModal
            isLoading={isLoadingDeletion}
            entityID={entitySelected}
            isOpen={hasEntitySelected}
            onClose={clearEntitySelected}
            onConfirm={onDelete}
        />
        {!hasEntities && !isLoading && (
            <Box w={"100%"} textAlign={"center"} marginTop={LegendsSize.margin.normal}>
                <Text fontSize={LegendsSize.fontSize.normal}>
                    <WarningIcon
                        display={"inline"}
                        marginRight={LegendsSize.margin.small}
                    />
                    {translateLabel("No entities to display")}
                </Text>
            </Box>
        )}
        {hasEntities && (
            <PaginationBar
                onChangePage={paginationProps.onChangePage}
                onChangePerPage={paginationProps.onChangePerPage}
                page={paginationProps.page}
                perPage={paginationProps.perPage}
                totalPages={paginationProps.totalPages}
                isLoading={isLoading}
            />
        )}
    </>
}
