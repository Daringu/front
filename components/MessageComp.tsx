import { AuthStoreContext } from "@/context/AuthStoreContext";
import { TeamsContext } from "@/context/TeamsModalContext";
import { Message } from "@/interfaces";
import { MessageService } from "@/services/MessageService";
import { Box, Button, DialogContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { toast } from "react-toastify";


interface MessageCompProps {
    item: Message;
}
const MessageComp = ({ item }: MessageCompProps) => {
    const { AuthStore } = useContext(AuthStoreContext)
    const { toggleOpen } = useContext(TeamsContext)
    const handleAccept = async () => {
        try {

            const res = await MessageService.acceptInvitation({ teamId: item.messageAttachment, messageId: item.id });
            if (res.status !== 404) {
                AuthStore.user.teams.push(res.team!);
            }
            AuthStore.user.messages = AuthStore.user.messages.filter(e => e.id !== res.messageId);
            toggleOpen()
            toast.success(res.responseMessage)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecline = async () => {
        try {
            const res = await MessageService.declineInvitation({ teamId: item.messageAttachment, messageId: item.id });
            AuthStore.user.messages = AuthStore.user.messages.filter(e => e.id !== res.messageId);
            toast.success(res.responseMessage);
        } catch (error) {
            console.log(error);

        }

    }
    console.log(item.id);

    return (<Box className=' border-solid border-4 border-blue-600 overflow-x-auto px-4 py-1 bg-white flex items-center max-w-xs'>
        <Typography>
            {item.text}
        </Typography>
        {item.messageType === 'invitation' &&
            <Box className=' flex'>
                <Button onClick={() => handleAccept()}>
                    accept
                </Button>
                <Button onClick={() => handleDecline()}>
                    decline
                </Button>
            </Box>}
    </Box>)
};

export default observer(MessageComp);