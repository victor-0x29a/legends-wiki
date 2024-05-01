import { Box, Container, Spinner, Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
import { useEntityList } from "./hooks/useEntityList";
import { LegendsColor, LegendsSize } from "../../styles/constants.style";
import { useCallback, useMemo } from "react";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import EntityImage from "../../components/EntityImage/EntityImage";

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

    const hasEntities = useMemo(() => entityList.length > 0, [entityList])

    const Navigate = useNavigate()

    const onEditClick = useCallback((id: number) => {
        return () => Navigate(`/entity/edit/${id}`)
    }, [Navigate])

    const onRemoveClick = useCallback(() => {
        return () => window.alert("Em breve o modal de confirmação de exclusão será implementado.")
    }, [])

    return (
        <Container maxW={"800px"}>
            <Table>
                <Thead>
                    <Tr>
                        <Th color={LegendsColor.textColors.white}>
                            ID
                        </Th>
                        <Th color={LegendsColor.textColors.white}>
                            Imagem
                        </Th>
                        <Th color={LegendsColor.textColors.white}>
                            Título
                        </Th>
                        <Th color={LegendsColor.textColors.white}>
                            Ações
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading && (
                        <Tr>
                            <Th colSpan={12} textAlign={"center"}>
                                <Spinner width={16} height={16} />
                                <Text marginTop={LegendsSize.margin.normal} fontSize={LegendsSize.fontSize.normal}>
                                    Carregando entidades
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
                                <EditIcon onClick={onEditClick(id)} marginRight={LegendsSize.margin.small} cursor={"pointer"} boxSize={5} />
                                <DeleteIcon onClick={onRemoveClick()} cursor={"pointer"} boxSize={5} />
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {!hasEntities && (
                <Box w={"100%"} textAlign={"center"} marginTop={LegendsSize.margin.normal}>
                    <Text fontSize={LegendsSize.fontSize.normal}>
                        <WarningIcon display={"inline"} marginRight={LegendsSize.margin.small} />
                        Não há entidades para serem exibidas
                    </Text>
                </Box>
            )}
            {hasEntities && (
                <PaginationBar
                    onChangePage={onChangePage}
                    onChangePerPage={onChangePerPage}
                    page={page}
                    perPage={perPage}
                    totalPages={totalPages}
                    isLoading={isLoading}
                />
            )}
        </Container>
    );
}
