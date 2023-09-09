'use client'
import React, { ReactNode, useState, useEffect, useContext } from 'react';
import Header from "@/components/Header";
import NavDrawer from "@/components/NavDrawer";
import { observer } from "mobx-react-lite";
import BoardStoreProvider from '@/context/BoardStoreContext';
import { AuthStoreContext } from '@/context/AuthStoreContext';
import Cookies from 'js-cookie';


const Layout = ({ children }: { children: ReactNode }) => {
    const [isDrawerOpen, setOpen] = useState(false)
    const { AuthStore } = useContext(AuthStoreContext);
    const handleBurgerClick = () => {
        setOpen((prevState) => !prevState)
    }

    useEffect(() => {
        if (Cookies.get('token')) {
            AuthStore.checkAuth();
            return;
        }
    }, [])

    return (
        <BoardStoreProvider>
            <div className='mx-auto my-0'>
                <Header onClick={handleBurgerClick} />
                <NavDrawer isDrawerOpen={isDrawerOpen} handleBurgerClick={handleBurgerClick}>
                    <h1>Hello world</h1>
                </NavDrawer>
                {children}
            </div>
        </BoardStoreProvider>
    );
};

export default observer(Layout);