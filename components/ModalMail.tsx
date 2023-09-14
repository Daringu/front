import { DialogueContext } from "@/context/DialogueContext";
import { Message } from "@/interfaces";
import { Box, Modal, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import MessageComp from "./MessageComp";

interface MailModalProps {
    items: Message[];
}

const MailModal = ({ items }: MailModalProps) => {
    const { open, toggleOpen } = useContext(DialogueContext)
    return (
        <Modal className="flex justify-center items-center" onClose={() => toggleOpen()} open={open}>
            <Box className='flex scroll overflow-y-auto max-h-80 flex-col gap-3 px-6 py-4'>
                {items?.length > 0 ? items.map(e => {
                    console.log(e);

                    return <MessageComp key={e.id} item={e} />
                }) : <Typography className=" text-3xl text-white">no messages</Typography>}
            </Box>
        </Modal>
    )
};


export default observer(MailModal);