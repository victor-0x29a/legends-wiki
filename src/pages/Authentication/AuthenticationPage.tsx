import { useCallback, useContext, useState } from "react";

import { I18nContext } from "../../contexts/i18n.context";
import { useAuthentication } from "./hooks/useAuthentication";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { FormError } from "../../components/FormError/FormError";

import { FormLabels } from "../../i18n/forms.i18n";

import { LegendsSize } from "../../styles/constants.style";

export const AuthenticationPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const {
        handleBlur,
        handleChange,
        isLoadingFormSubmit,
        errors,
        onSubmit
    } = useAuthentication()

    const togglePasswordVisibility = useCallback(() => {
        if (isLoadingFormSubmit) return
        setShowPassword((curr) => !curr)
    }, [isLoadingFormSubmit])

    const { translate } = useContext(I18nContext)


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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isLoadingFormSubmit}
                        />
                        <FormError errorData={errors.username} />
                    </div>
                    <FormLabel className="form-label">
                        {translate(FormLabels, "Password")}
                    </FormLabel>
                    <div className="control-group">
                        <InputGroup>
                            <InputLeftAddon
                                onClick={togglePasswordVisibility}
                                bgColor={"transparent"}
                                opacity={isLoadingFormSubmit ? 0.5 : 1}
                                className="clickable"
                            >
                                {showPassword ?
                                    <ViewOffIcon /> :
                                    <ViewIcon />}
                            </InputLeftAddon>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isLoadingFormSubmit}
                            />
                        </InputGroup>
                        <FormError errorData={errors.password} />
                    </div>
                    <Button
                        w={"100%"}
                        marginTop={LegendsSize.margin.normal}
                        type="submit"
                        colorScheme="green"
                        loadingText={translate(FormLabels, "Entering on account")}
                        isLoading={isLoadingFormSubmit}
                    >
                        {translate(FormLabels, "Login")}
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
}
