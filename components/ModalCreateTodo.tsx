'use client'
import { useContext, useState } from "react";
import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { statusType } from "@/models/response/TodoResponse";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import TodoStore from "@/stores/TodoStore";

interface ModalCreateTodoProps {
    status: statusType;
    onClose: () => void;
    isOpen: boolean;
    todoStore: TodoStore;
}

const ModalCreateTodo: React.FC<ModalCreateTodoProps> = ({ status, isOpen, onClose, todoStore }) => {
    const [text, setText] = useState<string>('');

    const handleCreate = () => {
        if (text.length < 1) {
            return toast.error('text is too short')
        }
        todoStore.addTodo({ text, status })
    }

    return (
        <Modal
            onClose={onClose}
            open={isOpen}
            aria-labelledby="Create todo"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box className='flex flex-col rounded-lg max-w-xs gap-3 bg-blue-200' sx={{ p: '5rem' }}>
                <TextField onChange={(e) => setText(e.target.value)} value={text} placeholder="todo text"></TextField>
                <Button onClick={handleCreate} className="shrink-0 grow-1 p-3" variant='outlined'>Create todo</Button>
            </Box>
        </Modal>
    );
};

export default observer(ModalCreateTodo);