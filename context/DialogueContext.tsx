'use client'

import { ReactNode, createContext, useState } from "react"

interface IDialogueContext {
    open: boolean;
    toggleOpen: () => void;
}

export const DialogueContext = createContext({} as IDialogueContext)


const DialogueContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }
    return (
        <DialogueContext.Provider value={{ open, toggleOpen }} >
            {children}
        </DialogueContext.Provider>
    )
}

export default DialogueContextProvider