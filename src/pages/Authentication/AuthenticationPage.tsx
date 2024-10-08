import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
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
import { useFormErrorAttempt } from "../../hooks/useFormErrorAttempt";

const INITIAL_DATA = {
    username: "",
    password: ""
}

export const AuthenticationPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = useCallback(() => {
        if (isLoading) return
        setShowPassword((curr) => !curr)
    }, [isLoading])

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

    return (
        <Container marginTop={"20%"}>
            <Box display={"flex"} justifyContent={"center"}>
                <FormControl
                    as="form"
                    onSubmit={onSubmit}
                    maxW={"400px"}
                >
                    <FormLabel className="form-label">
                        {translate(FormLabels, "User")}
                    </FormLabel>
                    <div className="control-group">
                        <Input
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isLoading}
                        />
                        <FormError errorData={formik.errors.username} />
                    </div>
                    <FormLabel className="form-label">
                        {translate(FormLabels, "Password")}
                    </FormLabel>
                    <div className="control-group">
                        <InputGroup>
                            <InputLeftAddon
                                onClick={togglePasswordVisibility}
                                bgColor={"transparent"}
                                opacity={isLoading ? 0.5 : 1}
                            >
                                {showPassword ?
                                    <ViewOffIcon /> :
                                    <ViewIcon />}
                            </InputLeftAddon>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={isLoading}
                            />
                        </InputGroup>
                        <FormError errorData={formik.errors.password} />
                    </div>
                    <Button
                        w={"100%"}
                        marginTop={LegendsSize.margin.normal}
                        type="submit"
                        colorScheme="green"
                        loadingText={translate(FormLabels, "Entering on account")}
                        isLoading={isLoading}
                    >
                        {translate(FormLabels, "Login")}
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
}
