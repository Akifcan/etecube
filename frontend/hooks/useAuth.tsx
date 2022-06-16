import { FC, useState, useEffect, useContext, createContext, ReactNode, useRef } from 'react'
import { useRouter } from 'next/router'

interface User {
    firstName: string,
    email: string,
    lastName: string
}

interface ContextProps {
    user?: User,
    logout?: () => void,
}

const authContext = createContext<ContextProps>({})

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const router = useRouter()
    const [user, setUser] = useState<User>()

    const logout = () => {
        setUser(undefined)
        router.push('/auth/login')
    }

    const autoLogin = () => {
        console.log("autologin");
    }

    useEffect(() => {
        autoLogin()
    }, [])

    return { user, logout }

}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}