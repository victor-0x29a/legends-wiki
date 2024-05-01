export type IPaginationProps = {
    page: number
    perPage: number,
    totalPages: number,
    onChangePage: (page: number) => void
    onChangePerPage: (perPage: number) => void
    isLoading: boolean
}
