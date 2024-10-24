import { identity } from "../../../types/app.type"
import { createUserPayload, createUserResponse, editUserPayload, User } from "../../../types/user.type"

export interface IUseUser {
    isLoadingDeletion: boolean
    deleteUser: (id: number, callback?: identity) => void
    isLoadingVisualization: boolean
    findUser: (id: number) => void
    user: User | null
    isLoadingCreation: boolean
    createUser: (data: createUserPayload, callback?: identity) => void
    createdUser: createUserResponse | null
    editUser: (id: number, data: editUserPayload, callback?: identity) => void
    isLoadingEdition: boolean
}
