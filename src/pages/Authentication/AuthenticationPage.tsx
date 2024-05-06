import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { FormEvent, useCallback, useContext, useState } from "react";
import { LegendsSize } from "../../styles/constants.style";
import { useFormik } from "formik";
import { signInSchema } from "./AuthenticationSchemas";
import { FormError } from "../../components/FormError/FormError";
import { UserModel } from "../../api";
import { AuthContext } from "../../contexts/auth.context";
import { useError } from "../../hooks/useError";
import { useAlert } from "../../hooks/useAlert";
import { I18nContext } from "../../contexts/i18n.context";
import { FormLabels } from "../../i18n/forms.i18n";

const INITIAL_DATA = {
    username: "",
    password: ""
}

export const AuthenticationPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = useCallback(() => setShowPassword((curr) => !curr), [])

    const { translateErrors } = useError()

    const { translate } = useContext(I18nContext)

    const { alert } = useAlert()

    const {
        authenticate
    } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: INITIAL_DATA,
        onSubmit: (values) => {
            setIsLoading(true)
            return UserModel.signIn(values).then(({ token }) => {
                authenticate(token)
                alert({ text: translate(FormLabels, "Login successful"), type: "success" })
            }).catch((errorList) => {
                const errors = translateErrors(errorList)
                errors!.forEach((error) => alert({ text: error }))
            }).finally(() => {
                setIsLoading(false)
            })
        },
        validationSchema: signInSchema
    })

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        formik.submitForm()
    }, [formik])

    return (
        <Container size={"sm"} w="100vw" h="100vh" display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <FormControl as="form" onSubmit={onSubmit}>
                <FormLabel>{translate(FormLabels, "User")}</FormLabel>
                <Input type="text" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={isLoading} />
                <FormError errorData={formik.errors.username} />
                <FormLabel>{translate(FormLabels, "Password")}</FormLabel>
                <InputGroup>
                    <InputLeftAddon onClick={togglePasswordVisibility} bgColor={"transparent"}>
                        {showPassword ?
                            <ViewOffIcon /> :
                            <ViewIcon />}
                    </InputLeftAddon>
                    <Input type={showPassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={isLoading} />
                </InputGroup>
                <FormError errorData={formik.errors.password} />
                <Button w={"100%"} marginTop={LegendsSize.margin.normal} type="submit" colorScheme="green" loadingText={translate(FormLabels, "Entering on account")} isLoading={isLoading}>
                    {translate(FormLabels, "Login")}
                </Button>
            </FormControl>
        </Container>
    );
}
