import { Box, Button } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { IPaginationProps } from "./PaginationBar.type"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export const PaginationBar = ({
    page,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    perPage,
    totalPages,
    onChangePage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChangePerPage,
    isLoading
}: IPaginationProps) => {
    const {
        hasPrevious,
        hasNext
    } = useMemo(() => {
        return {
            hasPrevious: (page - 1) > 0,
            hasNext: (page + 1) <= totalPages
        }
    }, [page, totalPages])

    const addPage = useCallback(() => onChangePage(page + 1), [onChangePage, page])

    const decreasePage = useCallback(() => onChangePage(page - 1), [onChangePage, page])

    return <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Button
            isDisabled={!hasPrevious}
            padding={0}
            bgColor={"transparent"}
            _hover={{
                backgroundColor: "transparent"
            }}
            onClick={decreasePage}
            isLoading={isLoading}
            id="pagination-bar-action-previous"
        >
            <ChevronLeftIcon boxSize={10} />
        </Button>
        <Button
            isDisabled={!hasNext}
            padding={0}
            bgColor={"transparent"}
            _hover={{
                backgroundColor: "transparent"
            }}
            onClick={addPage}
            isLoading={isLoading}
            id="pagination-bar-action-next"
        >
            <ChevronRightIcon boxSize={10} />
        </Button>
    </Box>
}
