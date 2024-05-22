import { AxiosResponse } from "axios";
import { extractData } from "../extract-data";

test('should extract data from response', () => {
    const response = {
        data: {
            foo: 'bar'
        }
    } as unknown as AxiosResponse

    const result = extractData(response)

    expect(result).toEqual({ foo: 'bar' })
})
