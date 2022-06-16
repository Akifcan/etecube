import { FC, useState, useEffect, useContext, createContext, ReactNode, useRef } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface User {
    firstName: string,
    email: string,
    lastName: string
    password?: string
}

interface ContextProps {
    errorMessage?: string
    user?: User,
    logout?: () => void,
    login?: (email: string, password: string) => Promise<void>,
    register?: (user: User) => Promise<void>,
    isLoading?: boolean
}

const authContext = createContext<ContextProps>({})

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const router = useRouter()
    const [user, setUser] = useState<User>()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setLoading] = useState(false)

    const logout = () => {
        setUser(undefined)
        router.push('/auth/login')
    }

    const autoLogin = () => {
        if (!Cookies.get('token')) {
            return router.push('/auth/login')
        }
        if (Cookies.get('token')) {
            console.log("ok");
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (response.status === 200) {
            Cookies.set('token', data.token)
            router.push('/')
        } else {
            setErrorMessage(data['message'])
        }
        setLoading(false)
    }

    const register = async (user: User) => {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (response.status === 201) {
            Cookies.set('token', data.token)
            router.push('/')
        } else {
            setErrorMessage(data['message'])
        }
        setLoading(false)
    }

    useEffect(() => {
        autoLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [router.asPath])

    return { user, logout, login, register, errorMessage, isLoading }

}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}