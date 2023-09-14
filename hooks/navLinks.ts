import {useContext, useMemo} from "react";
import {AuthStoreContext} from "@/context/AuthStoreContext";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { usePathname, useRouter} from "next/navigation";
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { DialogueContext } from "@/context/DialogueContext";
import AddIcon from '@mui/icons-material/Add';
import {CreateTeamContext} from "@/context/CreateTeamContext";
import Groups2Icon from '@mui/icons-material/Groups2';
import { TeamsContext } from "@/context/TeamsModalContext";

interface INavLinks{
    Icon:typeof LogoutIcon;
    text?:string|JSX.Element;
    onClick?:()=>void;
    id:string;
    visible?:boolean;
    quantity?:number;
}

export const useNavLinks=()=>{
    const {AuthStore}=useContext(AuthStoreContext)
    const router=useRouter();
    const pathName=usePathname();
    const {toggleOpen}=useContext(DialogueContext)
    const {toggleOpen:toggleOpenTeam}=useContext(CreateTeamContext)
    const {toggleOpen:toggleTeamsOpen}=useContext(TeamsContext)
    
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
            },
            {
                Icon:MarkunreadIcon,
                text:`Mail`,
                id:'mail',
                onClick:()=>{
                    toggleOpen()
                },
                quantity:AuthStore.user?.messages?.filter(e=>!e.seen).length,
                visible:AuthStore.isAuth
            },
            {
                Icon:AddIcon,
                text:'Create team',
                id:'createTeam',
                onClick:()=>{
                    toggleOpenTeam()
                },
                visible:AuthStore.isAuth
            },
            {
                Icon:Groups2Icon,
                text:'Teams',
                id:'teams',
                onClick:()=>{
                    toggleTeamsOpen()
                },
                visible:AuthStore.isAuth
            }
        ]
        return navLinks
    },[AuthStore.isAuth,AuthStore.user.messages,pathName,toggleOpen,toggleOpenTeam,toggleTeamsOpen,AuthStore.user])

    return links
}