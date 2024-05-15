import { useContext, useMemo } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"

export const LogoutPage = () => {
    const { token, logout } = useContext(AuthContext)

    const Navigate = useNavigate()

    const hasToken = useMemo(() => Boolean(token), [token])

    if (hasToken) {
        logout()
        return Navigate('/auth/login')
    }

    return Navigate('/')
}
