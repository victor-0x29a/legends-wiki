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
                toast.error(text, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
                break
            case "success":
                toast.success(text, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
                break
        }
    }, [])

    return {
        alert
    }
}
