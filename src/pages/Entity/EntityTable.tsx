import { Box, Spinner, Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { MinimalEntity } from "../../types/entity.type";
import { LegendsColor, LegendsSize } from "../../styles/constants.style";
import EntityImage from "../../components/EntityImage/EntityImage";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
import { useCallback, useContext, useMemo } from "react";
import { I18nContext } from "../../contexts/i18n.context";
import { FormLabels } from "../../i18n/forms.i18n";

type IEntityTableProps = {
    isLoading: boolean;
    entityList: MinimalEntity[]
    onEntityEditClick: (id: number) => () => void
    onEntityRemoveClick: () => () => void,
    paginationProps: {
        onChangePage: (page: number) => void;
        onChangePerPage: (perPage: number) => void;
        page: number;
        perPage: number;
        totalPages: number;
    }
}

export const EntityTable = ({ isLoading, entityList, onEntityEditClick, onEntityRemoveClick, paginationProps }: IEntityTableProps) => {
    const hasEntities = useMemo(() => entityList.length > 0, [entityList])

    const { translate } = useContext(I18nContext)

    const translateLabel = useCallback((label: string) => translate(FormLabels, label), [translate])

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
                            <Text marginTop={LegendsSize.margin.normal} fontSize={LegendsSize.fontSize.normal}>
                                {translateLabel("Loading entities")}
                            </Text>
                        </Th>
                    </Tr>
                )}
                {!isLoading && entityList.map(({ id, title, image }) => (
                    <Tr key={`item-${id}-entity-list-page`}>
                        <Th color={LegendsColor.textColors.gray}>
                            {id}
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            <EntityImage image={image} />
                        </Th>
                        <Th color={LegendsColor.textColors.gray}>
                            {title}
                        </Th>
                        <Th>
                            <EditIcon onClick={onEntityEditClick(id)} marginRight={LegendsSize.margin.small} cursor={"pointer"} boxSize={5} />
                            <DeleteIcon onClick={onEntityRemoveClick()} cursor={"pointer"} boxSize={5} />
                        </Th>
                    </Tr>
                ))}
            </Tbody>
        </Table>
        {!hasEntities && !isLoading && (
            <Box w={"100%"} textAlign={"center"} marginTop={LegendsSize.margin.normal}>
                <Text fontSize={LegendsSize.fontSize.normal}>
                    <WarningIcon display={"inline"} marginRight={LegendsSize.margin.small} />
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
