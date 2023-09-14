import { AuthStoreContext } from "@/context/AuthStoreContext";
import { CreateTeamContext } from "@/context/CreateTeamContext";
import { Box, Button, Modal, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

const CreateTeamModal = () => {
    const { toggleOpen, open } = useContext(CreateTeamContext)
    const [value, setValue] = useState('' as string)
    const { AuthStore } = useContext(AuthStoreContext)
    return (
        <Modal className="flex justify-center items-center" onClose={() => { toggleOpen() }} open={open}>
            <Box className='py-11 bg-gray-100 px-6'>
                <TextField variant='outlined' onChange={(e) => setValue(e.target.value)} value={value} />
                <Button className=" border-solid border-2 border-l-sky-500" onClick={() => AuthStore.createTeam(value)} >Create team</Button>
            </Box>
        </Modal>
    );
};


export default observer(CreateTeamModal);