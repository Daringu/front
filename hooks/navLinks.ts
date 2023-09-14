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
    disabled:boolean;
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
            visible:true,
            disabled:false
        },
            {
                Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
                text:'To todos',
                id:'totodos',
                onClick:()=>{
                    router.replace('/todos')
                },
                visible:pathName!=='/todos'&&AuthStore.isAuth,
                disabled:!AuthStore.isLoading
            },
            {
                Icon:AuthStore.isAuth? LogoutIcon:LoginIcon,
                text:'Main page',
                id:'main',
                onClick:()=>{
                    router.replace('/')
                },
                visible:pathName!=='/',
                disabled:!AuthStore.isLoading
            },
            {
                Icon:MarkunreadIcon,
                text:`Mail`,
                id:'mail',
                onClick:()=>{
                    toggleOpen()
                },
                quantity:AuthStore.user?.messages?.filter(e=>!e.seen).length,
                visible:AuthStore.isAuth,
                disabled:false
            },
            {
                Icon:AddIcon,
                text:'Create team',
                id:'createTeam',
                onClick:()=>{
                    toggleOpenTeam()
                },
                visible:AuthStore.isAuth,
                disabled:false
            },
            {
                Icon:Groups2Icon,
                text:'Teams',
                id:'teams',
                onClick:()=>{
                    toggleTeamsOpen()
                },
                visible:AuthStore.isAuth,
                disabled:false
            }
        ]
        return navLinks
    },[AuthStore.isAuth,AuthStore.user.messages,pathName,toggleOpen,toggleOpenTeam,toggleTeamsOpen,AuthStore.user,AuthStore.isLoading])

    return links
}