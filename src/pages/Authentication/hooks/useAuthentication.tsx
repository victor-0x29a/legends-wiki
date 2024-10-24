import { FormEvent, useCallback, useContext, useState } from "react"

import { useFormik } from "formik"

import { UserModel } from "../../../api"
import { signInSchema } from "../form/AuthenticationSchemas"

import { AuthContext } from "../../../shared/contexts/auth.context"
import { I18nContext } from "../../../shared/contexts/i18n.context"

import { useAlert } from "../../../shared/hooks/useAlert"
import { useError } from "../../../shared/hooks/useError"
import { useFormErrorAttempt } from "../../../shared/hooks/useFormErrorAttempt"

import { FormLabels } from "../../../shared/i18n/forms.i18n"

import type { IUseAuthentication } from "./useAuthentication.type"

const INITIAL_DATA = {
    username: "",
    password: ""
}

export const useAuthentication = (): IUseAuthentication => {
    const { alert } = useAlert()

    const { translateErrors } = useError()

    const { translate } = useContext(I18nContext)

    const {
        authenticate
    } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: INITIAL_DATA,
        onSubmit: (values) => {
            setIsLoading(true)
            return UserModel.signIn(values).then(({ token }) => {
                authenticate(token)
                alert({ text: translate(FormLabels, "Login successful"), type: "success" })
            }).catch((errorList) => {
                const errors = translateErrors(errorList, true)
                errors && errors!.forEach((error) => alert({ text: error }))
            }).finally(() => {
                setIsLoading(false)
            })
        },
        validationSchema: signInSchema,
        validateOnChange: false,
        validateOnBlur: false
    })

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        formik.submitForm()
    }, [formik])

    const onErrorCallBack = useCallback(() => {
        alert({
            text: translate(FormLabels, "Check again the fields"),
            type: "error"
        })
    }, [alert, translate])

    useFormErrorAttempt(formik.errors, onErrorCallBack)

    return {
        onSubmit,
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
        isLoadingFormSubmit: isLoading,
        errors: formik.errors
    }
}
