'use client'
import BoardStore from "@/stores/BoardStore";
import { createContext, ReactNode } from "react";

interface IBoardStore {
    boardStore: BoardStore;
}
const boardStore = new BoardStore();

export const BoardStoreContext = createContext<IBoardStore>({ boardStore })

const BoardStoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <BoardStoreContext.Provider value={{ boardStore }}>
            {children}
        </BoardStoreContext.Provider>)
}

export default BoardStoreProvider