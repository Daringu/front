'use client'
import TodoStore from "@/stores/TodoStore";
import {createContext, ReactNode} from "react";

interface ITodoStore{
    todoStore:TodoStore;
}

const todoStore=new TodoStore();

export const TodoStoreContext=createContext<ITodoStore>({todoStore})

 const TodoStoreProvider=({children}:{children:ReactNode})=>{
    return (
        <TodoStoreContext.Provider value={{todoStore}}>
            {children}
        </TodoStoreContext.Provider>)
}


export default TodoStoreProvider