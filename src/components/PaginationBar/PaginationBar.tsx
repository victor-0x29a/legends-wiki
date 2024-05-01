import { Box, Button } from "@chakra-ui/react"
import { useMemo } from "react"
import { IPaginationProps } from "./PaginationBar.type"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export const PaginationBar = ({
    page,
    perPage,
    totalPages,
    onChangePage,
    onChangePerPage
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

    return <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Button disabled={!hasPrevious} padding={0} bgColor={"transparent"} _hover={{
            backgroundColor: "transparent"
        }} onClick={() => onChangePage(page + 1)}>
            <ChevronLeftIcon boxSize={10} />
        </Button>
        <Button disabled={!hasNext} padding={0} bgColor={"transparent"} _hover={{
            backgroundColor: "transparent"
        }} onClick={() => onChangePerPage(perPage + 1)}>
            <ChevronRightIcon boxSize={10} />
        </Button>
    </Box>
}
