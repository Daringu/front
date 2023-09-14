'use client';

import Boards from "@/components/Boards";
import { availableStatuses } from "@/models/response/TodoResponse";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TodoStore from "@/stores/TodoStore";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { toast } from "react-toastify";



const TeamTodosPage = () => {
    const [value, setValue] = useState('' as string)
    const params = useParams()
    const router = useRouter()
    const { AuthStore } = useContext(AuthStoreContext)
    const [todoStore, setTodoStore] = useState<TodoStore>(() => { return new TodoStore('team', params.id as string) })

    useEffect(() => {
        if (!todoStore.isLoading && !todoStore.team) {
            router.push('/')
            toast.error('team not found')
        }
    }, [todoStore.isLoading])




    return (
        <div className="flex flex-col py-5">
            <Boards todoStore={todoStore} types={availableStatuses} teamId={params.id as string} mode="team" />
            <Container className=' flex px-4 mt-4 justify-between gap-5'>
                <Box className=' flex items-center gap-3'>
                    <TextField onChange={(e) => setValue(e.target.value)} value={value} placeholder="username" />
                    <Button onClick={(e) => {
                        todoStore.sendInvitation(value)
                    }}>invite to team</Button>
                </Box>
                <Box className=' flex flex-col items-center'>
                    <Typography className=" text-3xl">Users:</Typography>
                    {todoStore.team?.users?.map(e => {
                        return <Typography key={e.username} className=" text-2xl">{e.username}</Typography>
                    })}
                </Box>
            </Container>
        </div>

    )
}


export default observer(TeamTodosPage);