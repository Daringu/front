import {useContext, useMemo} from "react";
import {AuthStoreContext} from "@/context/AuthStoreContext";
import {TodoStoreContext} from "@/context/TodoStoreContext";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {useRouter} from "next/navigation";
interface INavLinks{
    Icon:typeof LogoutIcon;
    text?:string;
    onClick?:()=>void;
    id:string;
}

export const useNavLinks=()=>{
    const {AuthStore}=useContext(AuthStoreContext)
    const {todoStore}=useContext(TodoStoreContext)
    const router=useRouter();

    const links=useMemo(()=>{
        const navLinks:INavLinks[]=[{
            Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
            text:AuthStore.isAuth?'Log Out':'Log In',
            onClick:()=>{
                if (AuthStore.isAuth){
                    AuthStore.logout()
                }else{
                    router.replace('/auth')
                }
            },
            id:'log'
        },
            {
                Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
                text:'Andrii loh',
                id:'loh'
            },
        ]
        return navLinks
    },[AuthStore.isAuth,AuthStore,router])

    return links
}