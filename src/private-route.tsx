import { useContext, useMemo } from "react"
import { AuthContext } from "./contexts/auth.context"
import { Navigate } from "react-router-dom"

type IProtectRouteProps = {
    children: React.ReactNode
    forProtect?: boolean
}

export const PrivateRoute = ({ children, forProtect = false }: IProtectRouteProps) => {
    const { token } = useContext(AuthContext)

    const hasToken = useMemo(() => Boolean(token), [token])

    /*
        When is for protect and has token, return children
        When is for protect and has no token, return to login

        When is not for protect and has token, return to /auth
        When is not for protect and has no token, return children
    */

    if (forProtect) {
        if (hasToken) return children

        return <Navigate to="/auth/login" />
    }

    if (hasToken) return <Navigate to="/auth" />

    return children
}
