'use client'
import { ReactNode, createContext } from 'react'
import Store from "@/stores/AuthStore";

interface IAuthStore {
    AuthStore: Store
}

const AuthStore = new Store();

export const AuthStoreContext = createContext<IAuthStore>({ AuthStore })


const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthStoreContext.Provider value={{ AuthStore }}>
            {children}
        </AuthStoreContext.Provider>
    )
}


export default AuthStoreProvider