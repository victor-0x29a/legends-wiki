import { AxiosError } from "axios";

export const getError = (error: unknown) => {
    const isAxiosError = error instanceof AxiosError

    if (!isAxiosError) {
        return ["Internal error"]
    }

    const statusCode = error?.status || 0

    if (statusCode === 401) {
        return ["Required authentication"]
    }
    if (statusCode >= 500) {
        return ["Internal error"]
    }

    const responseData = error.response?.data as unknown as {
        errorList: string[]
    }

    if (!responseData) {
        return ["Internal error"]
    }

    return responseData?.errorList
}
