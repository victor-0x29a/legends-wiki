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
