import { useEffect } from "react"
import type { identity } from "../types/app.type"

/**
 * useFormErrorAttempt
 * @param errors Object with errors
 * @returns void
*/
export const useFormErrorAttempt = (errors: Record<string, string>, callback: identity) => {
    // const callbackRef = useRef<identity>(callback)

    useEffect(() => {
        const isEmptyErrorsList = Object.keys(errors).length === 0

        if (isEmptyErrorsList) return

        // callbackRef.current()
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    // useEffect(() => {
        // return () => {
            // callbackRef.current = callback
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
}
