import { createUserPayload } from "../../types/user.type";

export const UserParser = {
    create: (data: createUserPayload): createUserPayload => {
        return {
            name: data?.name || undefined,
            username: data.username,
            password: data.password
        }
    }
}
