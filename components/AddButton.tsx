'use client'
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from 'mobx-react-lite';
import { useContext } from "react";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { toast } from "react-toastify";
interface AddButtonProps {
    onClick: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    const { AuthStore } = useContext(AuthStoreContext)
    return (
        <Fab
            onClick={(e) => {
                if (!AuthStore.isAuth) {
                    toast.warn('you are not logged in')
                    return
                }
                if (!AuthStore.user.isActivated) {
                    toast.warn('Activate your email')
                    return;
                }
                onClick()
            }}
            className=" bg-blue-600"
            color='info' aria-label="add"
        >
            <AddIcon sx={{ fill: 'black' }} />
        </Fab>
    )
}

export default observer(AddButton)