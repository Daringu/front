import { AuthStoreContext } from "@/context/AuthStoreContext";
import { TeamsContext } from "@/context/TeamsModalContext";
import { Box, Modal, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import DelteConifrm from "./DelteConifrm";

const TeamsModal = () => {
    const { toggleOpen, open } = useContext(TeamsContext)
    const { AuthStore } = useContext(AuthStoreContext)
    const router = useRouter()

    return (
        <Modal className="flex justify-center items-center" onClose={() => { toggleOpen() }} open={open}>
            <Box className='py-11 bg-gray-100 px-6 gap-1 flex max-w-md flex-wrap'>
                {AuthStore.user.teams?.length > 0 ?
                    AuthStore.user.teams.map((team) => {
                        return (
                            <Box onClick={
                                () => {
                                    router.push(`/todos/${team.teamId}`)
                                    toggleOpen()
                                }
                            } key={team.teamId} className=" flex transition-all duration-150 hover:bg-sky-400 cursor-pointer px-5 py-3 border-solid border-2 border-sky-500" >
                                <Typography className=" text-lg">
                                    {team?.teamName}
                                </Typography>
                                <DelteConifrm onConfirm={() => AuthStore.deleteTeam(team.teamId)} />
                            </Box>
                        )
                    }) : <Typography className="text-lg">You have no teams</Typography>
                }
            </Box>
        </Modal>
    );
};


export default observer(TeamsModal);