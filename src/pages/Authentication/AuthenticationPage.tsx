import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { LegendsSize } from "../../styles/constants.style";
import { useFormik } from "formik";
import { signInSchema } from "./AuthenticationSchemas";
import { FormError } from "../../components/FormError/FormError";
import { UserModel } from "../../api";
import { AuthContext } from "../../contexts/auth.context";
import { useError } from "../../hooks/useError";
import { useAlert } from "../../hooks/useAlert";

const INITIAL_DATA = {
    username: "",
    password: ""
}

export const AuthenticationPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = useCallback(() => setShowPassword((curr) => !curr), [])

    const { translateErrors } = useError()

    const { alert } = useAlert()

    const {
        authenticate
    } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: INITIAL_DATA,
        onSubmit: (values) => {
            return UserModel.signIn(values).then(({ token }) => {
                authenticate(token)
            }).catch((errorList) => {
                const errors = translateErrors(errorList)
                errors.forEach((error) => alert({ text: error }))
            })
        },
        validationSchema: signInSchema
    })

    return (
        <Container size={"sm"} w="100vw" h="100vh" display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <FormControl>
                <FormLabel>Usuário</FormLabel>
                <Input type="text" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <FormError errorData={formik.errors.username} />
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                    <InputLeftAddon onClick={togglePasswordVisibility} bgColor={"transparent"}>
                        {showPassword ?
                            <ViewOffIcon /> :
                            <ViewIcon />}
                    </InputLeftAddon>
                    <Input type={showPassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </InputGroup>
                <FormError errorData={formik.errors.password} />
                <Button w={"100%"} marginTop={LegendsSize.margin.normal} onClick={() => formik.submitForm()} colorScheme="green">
                    Entrar
                </Button>
            </FormControl>
        </Container>
    );
}