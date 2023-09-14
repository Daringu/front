'use client'

import { ReactNode, createContext, useState } from "react"

interface IDialogueContext {
    open: boolean;
    toggleOpen: () => void;
}

export const CreateTeamContext = createContext({} as IDialogueContext)


const CreateTeamContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }
    return (
        <CreateTeamContext.Provider value={{ open, toggleOpen }} >
            {children}
        </CreateTeamContext.Provider>
    )
}

export default CreateTeamContextProvider