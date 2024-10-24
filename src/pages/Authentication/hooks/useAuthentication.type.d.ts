import { FormEvent } from "react"
import { FormikHandlers } from "formik"

export interface IUseAuthentication {
    onSubmit: (event: FormEvent) => void
    isLoadingFormSubmit: boolean
    handleChange: FormikHandlers['handleChange']
    handleBlur: FormikHandlers['handleBlur']
    errors: Record<string, string>
}
