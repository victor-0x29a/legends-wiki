export interface signInPayload {
    username: string
    password: string
}

export interface signInResponse {
    token: string
}

export type User = {
    id: number
    name: string
    username: string
}

export type findAllUsersResponse = User[]

export type findOneUserResponse = User

export interface createUserPayload {
    name?: string
    username: string
    password: string
}

export interface createUserResponse {
    id: number
    name: string
    username: string
    password: string
    updatedAt: string
    createdAt: string
}

export interface editUserPayload {
    name?: string
    username?: string
}
