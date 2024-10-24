import { useContext, useEffect, useMemo } from "react"

import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../shared/contexts/auth.context"

import { Box, Text } from "@chakra-ui/react"

export const LogoutPage = () => {
    const { token, logout } = useContext(AuthContext)

    const Navigate = useNavigate()

    const hasToken = useMemo(() => Boolean(token), [token])

    useEffect(() => {
        if (hasToken) {
            logout()
            return Navigate('/auth/login')
        }
        return Navigate('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasToken])

    return <Box>
        <Text>Logout...</Text>
    </Box>
}
