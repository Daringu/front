'use client'

import { ReactNode, createContext, useState } from "react"

interface IDialogueContext {
    open: boolean;
    toggleOpen: () => void;
}

export const TeamsContext = createContext({} as IDialogueContext)


const TeamsContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }
    return (
        <TeamsContext.Provider value={{ open, toggleOpen }} >
            {children}
        </TeamsContext.Provider>
    )
}

export default TeamsContextProvider