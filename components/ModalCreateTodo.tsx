'use client'
import { useContext, useState } from "react";
import { TodoStoreContext } from "@/context/TodoStoreContext";
import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { statusType } from "@/models/response/TodoResponse";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

interface ModalCreateTodoProps {
    statuses: statusType[]
}

const ModalCreateTodo: React.FC<ModalCreateTodoProps> = ({ statuses }) => {
    const { todoStore } = useContext(TodoStoreContext)
    const [status, setStatus] = useState<statusType>(statuses[0]);
    const [text, setText] = useState<string>('');
    const handleCreate = () => {
        if (text.length < 1) {
            return toast.error('text is too short')
        }
        todoStore.addTodo({ text, status })
        todoStore.setCreateTodoOpen()
    }
    return (
        <Modal
            onClose={() => todoStore.setCreateTodoOpen()}
            open={todoStore.isCreateTodoOpen}
            aria-labelledby="Create todo"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box className='flex flex-col rounded-lg max-w-xs gap-3 bg-blue-200' sx={{ p: '5rem' }}>
                <TextField onChange={(e) => setText(e.target.value)} value={text} placeholder="todo text"></TextField>
                <Select onChange={(e) => setStatus(e.target.value as statusType)} value={status}>
                    {statuses.map(e => {
                        return <MenuItem value={e} key={e}>{e}</MenuItem>
                    })}
                </Select>
                <Button onClick={handleCreate} className="shrink-0 grow-1 p-3" variant='outlined'>Create todo</Button>
            </Box>
        </Modal>
    );
};

export default observer(ModalCreateTodo);