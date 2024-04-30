import React, { createContext, useCallback, useMemo, useState } from "react";

type IUseAuthProviderProps = {
    children: React.ReactNode
}

type IUseAuthContext = {
    token: string | null
    authenticate: (token: string) => void
} | null


export const AuthContext = createContext<IUseAuthContext>(null)

export const AuthProvider = ({ children }: IUseAuthProviderProps) => {
    const [token, setToken] = useState<null | string>(null)

    const authenticate = useCallback((newToken: string) => {
        setToken(newToken)
    }, [setToken])

    const values = useMemo<IUseAuthContext>(() => ({
        token,
        authenticate
    }), [token, authenticate])

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
