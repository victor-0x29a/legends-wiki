import { useEffect } from "react"
import type { identity } from "../../types/app.type"

export const useFormErrorAttempt = (errors: Record<string, string>, callback: identity) => {
    useEffect(() => {
        const isEmptyErrorsList = Object.keys(errors).length === 0

        if (isEmptyErrorsList) return

        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])
}
