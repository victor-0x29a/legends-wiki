import { User } from "../../../types/user.type"

export interface IUserTableProps {
    users: User[]
    isLoading: boolean
    onUserEditClick: (id: number) => void
    onUserDeleteClick: (id: number) => void
}
