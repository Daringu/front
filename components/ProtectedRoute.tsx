'use client';

import { AuthStoreContext } from "@/context/AuthStoreContext";
import { useContext } from "react";
import Loading from "@/app/(site)/loading";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"

interface props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<props> = ({ children }) => {
    const { AuthStore } = useContext(AuthStoreContext);
    const router = useRouter();
    if (AuthStore.isLoading) {
        return <Loading />
    }

    if (!AuthStore.isAuth) {
        router.push('/')
        toast.error('You are not authorized')
        return;
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute;