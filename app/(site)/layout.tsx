'use client'
import React, { ReactNode, useState } from 'react';
import Header from "@/components/Header";
import NavDrawer from "@/components/NavDrawer";
import { observer } from "mobx-react-lite";
import { Box, Container } from "@mui/material";
import BoardStoreProvider from '@/context/BoardStoreContext';

const Layout = ({ children }: { children: ReactNode }) => {
    const [isDrawerOpen, setOpen] = useState(false)
    const handleBurgerClick = () => {
        setOpen((prevState) => !prevState)
    }
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