import { useCallback } from "react"
import { toast } from "react-toastify"

type IAlertProps = {
    type?: "error" | "success",
    text: string
}

export const useAlert = () => {
    const alert = useCallback(({ text, type = "error" }: IAlertProps) => {
        switch (type) {
            case "error":
                toast.error(text)
                break
            case "success":
                toast.success(text)
                break
        }
    }, [])

    return {
        alert
    }
}
