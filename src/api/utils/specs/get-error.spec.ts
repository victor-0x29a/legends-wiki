import { AxiosError, AxiosHeaders } from "axios"
import { getError } from "../get-error"

const createMockedAxiosError = (status: number): AxiosError => {
    return new AxiosError(
        "Error",
        "foo",
        {
            url: "localhost:4000",
            headers: new AxiosHeaders()
        },
        {
            path: "/bar"
        },
        // @ts-expect-error - This is a spec
        {
            status
        }
    )
}

test('should return internal error when not is an AxiosError', () => {
    const error = new Error('Some error')

    try {
        getError(error)
    } catch (error) {
        expect(error).toEqual(['Internal error'])
    }
})

test('should return internal error when is an internal error', () => {
    const error = new AxiosError('Spec error', '500')

    try {
        getError(error)
    } catch (error) {
        expect(error).toEqual(['Internal error'])
    }
})

test('should return internal error when not have a response data', () => {
    const error = createMockedAxiosError(400)

    try {
        getError(error)
    } catch (error) {
        expect(error).toEqual(['Internal error'])
    }
})

test('should return required authentication when is a 401 error', () => {
    const error = createMockedAxiosError(401)

    try {
        getError(error)
    } catch (error) {
        expect(error).toEqual(['Required authentication'])
    }
})
