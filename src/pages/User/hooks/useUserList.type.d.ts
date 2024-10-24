import { findAllUsersResponse } from "../../../types/user.type"

export interface IUseUserList {
    users: findAllUsersResponse
    isLoading: boolean
    refreshRequest: () => void
}
