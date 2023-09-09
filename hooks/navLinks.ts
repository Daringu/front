import {useContext, useMemo} from "react";
import {AuthStoreContext} from "@/context/AuthStoreContext";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { usePathname, useRouter} from "next/navigation";
interface INavLinks{
    Icon:typeof LogoutIcon;
    text?:string;
    onClick?:()=>void;
    id:string;
    visible?:boolean;
}

export const useNavLinks=()=>{
    const {AuthStore}=useContext(AuthStoreContext)
    const router=useRouter();
    const pathName=usePathname();
    const links=useMemo(()=>{
        const navLinks:INavLinks[]=[{
            Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
            text:AuthStore.isAuth?'Log Out':'Log In',
            onClick:async ()=>{
                if (AuthStore.isAuth){
                    await AuthStore.logout()
                    router.replace('/')
                }else{
                    router.replace('/auth')
                }
            },
            id:'log',
            visible:true
        },
            {
                Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
                text:'To todos',
                id:'totodos',
                onClick:()=>{
                    router.replace('/todos')
                },
                visible:pathName!=='/todos'&&AuthStore.isAuth
            },
            {
                Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
                text:'Main page',
                id:'main',
                onClick:()=>{
                    router.replace('/')
                },
                visible:pathName!=='/'
            }
        ]
        return navLinks
    },[AuthStore.isAuth,AuthStore,pathName])

    return links
}