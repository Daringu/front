'use client'
import React, { ReactNode, useState, useEffect, useContext } from 'react';
import Header from "@/components/Header";
import NavDrawer from "@/components/NavDrawer";
import { observer } from "mobx-react-lite";
import { AuthStoreContext } from '@/context/AuthStoreContext';
import Cookies from 'js-cookie';
import CreateTeamModal from '@/components/CreateTeamModal';
import TeamsModal from '@/components/TeamsModal';
import ModalMail from '@/components/ModalMail';


const Layout = ({ children }: { children: ReactNode }) => {
    const [isDrawerOpen, setOpen] = useState(false)
    const { AuthStore } = useContext(AuthStoreContext);
    const handleBurgerClick = () => {
        setOpen((prevState) => !prevState)
    }
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('user')) {
            AuthStore.checkAuth();
            return;
        }
    }, [])

    return (
        <div className='mx-auto my-0'>
            <Header onClick={handleBurgerClick} />
            <NavDrawer isDrawerOpen={isDrawerOpen} handleBurgerClick={handleBurgerClick}>
                <h1>Hello world</h1>
            </NavDrawer>
            {children}
            <CreateTeamModal />
            <TeamsModal />
            <ModalMail items={AuthStore.user.messages} />
        </div>
    );
};

export default observer(Layout);