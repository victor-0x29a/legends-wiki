import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useFormik } from "formik"
import { FormEvent, useCallback, useContext, useMemo } from "react"
import { I18nContext } from "../../../contexts/i18n.context"
import { FormLabels } from "../../../i18n/forms.i18n"
import { FormError } from "../../../components/FormError/FormError"
import { LegendsSize } from "../../../styles/constants.style"
import { getUserSchema } from "../form/user.schemas"
import type { IUserFormProps } from "./UserForm.type"

export const UserForm = ({
    initialValues,
    onSubmit,
    isLoading = false,
    isEdition = false
}: IUserFormProps) => {
    const { translate } = useContext(I18nContext)

    const schema = useMemo(() => getUserSchema(isEdition), [isEdition])

    const formik = useFormik({
        initialValues,
        onSubmit,
        validateOnChange: false,
        validationSchema: schema
    })

    const onFormSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        formik.submitForm()
    }, [formik])

    return (
        <FormControl as={"form"} onSubmit={onFormSubmit}>
            <FormLabel>
                {translate(FormLabels, "Name")}
            </FormLabel>
            <Input
                placeholder={translate(FormLabels, "Not required")}
                name="name"
                required={false}
                onChange={formik.handleChange}
                value={formik.values?.name || ""}
                disabled={isLoading}
                id="user-form-name-input"
            />
            <FormError errorData={formik.errors.name} />
            <FormLabel>
                {translate(FormLabels, "User")}
            </FormLabel>
            <Input
                placeholder={translate(FormLabels, "Required")}
                name="username"
                required={false}
                onChange={formik.handleChange}
                value={formik.values?.username || ""}
                disabled={isLoading}
                id="user-form-username-input"
            />
            <FormError errorData={formik.errors.username} />
            {!isEdition && (
                <>
                    <FormLabel>
                        {translate(FormLabels, "Password")}
                    </FormLabel>
                    <Input
                        placeholder={translate(FormLabels, "Required")}
                        name="password"
                        required={false}
                        onChange={formik.handleChange}
                        value={formik.values?.password || ""}
                        disabled={isLoading}
                        type="password"
                        id="user-form-password-input"
                    />
                    <FormError errorData={formik.errors.password} />
                </>
            )}
            <Button
                marginTop={LegendsSize.margin.normal}
                w="100%"
                colorScheme="green"
                type="submit"
                marginBottom={LegendsSize.margin.large}
                isLoading={isLoading}
                loadingText={translate(FormLabels, "Sending form")}
            >
                {isEdition ? translate(FormLabels, "Edit") : translate(FormLabels, "Create")}
            </Button>
        </FormControl>
    );
}
