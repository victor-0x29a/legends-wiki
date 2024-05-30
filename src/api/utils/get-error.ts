import { AxiosError } from "axios";

export const getError = (error: unknown) => {
    const isAxiosError = error instanceof AxiosError

    const errorIIFE = function() {
        // @ts-expect-error - error is unknown
        if (error?.message === 'Network Error') {
            return ["Internal error"]
        }

        if (!isAxiosError) {
            return ["Internal error"]
        }

        const statusCode = error?.status || error?.response?.status || 0

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

        const errorList = responseData?.errorList

        if (!errorList || !Array.isArray(errorList)) return ["Internal error"]

        return responseData?.errorList
    }()

    throw errorIIFE
}
