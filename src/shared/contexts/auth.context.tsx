import React, { createContext, useCallback, useMemo, useState } from "react";

type IUseAuthProviderProps = {
    children: React.ReactNode
}

type IUseAuthValues = {
    token: string | null
    authenticate: (token: string) => void,
    logout: () => void,
    userData: {
        id: string
        username: string
        exp?: number
        iat?: number
    }
}

type IUseAuthContext = IUseAuthValues


export const AuthContext = createContext<IUseAuthContext>(null!)

export const AuthProvider = ({ children }: IUseAuthProviderProps) => {
    const token = useMemo(() => localStorage.getItem('token'), [])

    const [updatedToken, setUpdatedToken] = useState<string | null>(token)

    const userData = useMemo(() => {
        if (!updatedToken) return null
        const decodedToken = function () {
            const payload = JSON.parse(atob(updatedToken.split('.')[1]))
            return payload
        }()
        return decodedToken
    }, [updatedToken]) as { id: string, username: string }

    const authenticate = useCallback((newToken: string) => {
        localStorage.setItem('token', newToken)
        setUpdatedToken(newToken)
    }, [])

    const logout = useCallback(() => {
        localStorage.clear()
        setUpdatedToken(null)
    }, [])

    const values = useMemo(() => ({
        token: updatedToken,
        authenticate,
        logout,
        userData
    }), [updatedToken, authenticate, logout, userData])

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
