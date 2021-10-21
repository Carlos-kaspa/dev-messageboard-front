import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
    children: ReactNode
}

type AuthContextData = {
    user: User | null
    signInUrl: string
    signOut: () => void
}

type User = {
    id: string,
    name: string,
    login: string,
    avatar_url: string
}

type AuthResponse = {
    token: string
    user: {
        id: string,
        avatar_url: string,
        name: string,
        login: string
    } 
}


export const AuthProvider = (props: AuthProvider) => {

    const [ user, setUser ] = useState<User | null>(null)

    const signInUrl = 
    `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_AUTH_CLIENT_ID}`

    const signIn = async (githubCode: string) => {
        const {data:{ token, user }} = await api.post<AuthResponse>('/authenticate', {
            code: githubCode
        })

        localStorage.setItem('@dev-messageboard:token', token)
        api.defaults.headers.common.authorization = `Bearer ${token}` 
        setUser(user)
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('@dev-messageboard:token')
    }

    useEffect(() => {
        const token = localStorage.getItem("@dev-messageboard:token")
        if(token){
            // seta o header em todas a req daqui pra frente
            api.defaults.headers.common.authorization = `Bearer ${token}` 

            api.get<User>('user/profile').then(({data}) => setUser(data))
        }
    },[])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')
        if(hasGithubCode){
            const [appUrl, code] = url.split('?code=')
            window.history.pushState({}, '', appUrl)

        signIn(code)
        } 
    },[])
    
    return (
        <AuthContext.Provider 
            value={{signInUrl, user, signOut}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}