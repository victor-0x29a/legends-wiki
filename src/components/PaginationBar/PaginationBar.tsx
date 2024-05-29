import { Box, Button } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { IPaginationProps } from "./PaginationBar.type"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { LegendsSize } from "../../styles/constants.style"
import { Select } from "../Select"
import { DefaultPerPageOptionsStyle } from "./PaginationBar.style"

const PER_PAGE_OPTIONS = [10, 25, 50]

export const PaginationBar = ({
    page,
    perPage,
    totalPages,
    onChangePage,
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

    const mountedPerPageOptions = useMemo(() => PER_PAGE_OPTIONS.map((value) => ({
        label: value.toString(),
        value: value.toString()
    })), [])

    const onPerPageChange = useCallback((perPage: string) => {
        onChangePerPage(Number(perPage))
    }, [onChangePerPage])

    return <Box width={"100%"} display={"flex"} justifyContent={"space-between"} padding={LegendsSize.padding.normal}>
        <Select
            onSelect={onPerPageChange}
            options={mountedPerPageOptions}
            placeholder="Pagination"
            others={{
                w: "100px",
                variant: "filled",
                bgColor: 'transparent',
                css: DefaultPerPageOptionsStyle,
                placeholder: undefined,
                cursor: "pointer",
                value: perPage || PER_PAGE_OPTIONS[0].toString()
            }}
        />
        <Box display={"flex"} gap={LegendsSize.margin.normal}>
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
    </Box>
}
