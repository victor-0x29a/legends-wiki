import React, { createContext, useCallback, useMemo, useState } from "react";

type IUseAuthProviderProps = {
    children: React.ReactNode
}

type IUseAuthContext = {
    token: string | null
    authenticate: (token: string) => void
} | null


const useAuthContext = createContext<IUseAuthContext>(null)

export const UseAuthProvider = ({ children }: IUseAuthProviderProps) => {
    const [token, setToken] = useState<null | string>(null)

    const authenticate = useCallback((newToken: string) => {
        setToken(newToken)
    }, [setToken])

    const values = useMemo<IUseAuthContext>(() => ({
        token,
        authenticate
    }), [token, authenticate])

    return <useAuthContext.Provider value={values}>{children}</useAuthContext.Provider>
}
