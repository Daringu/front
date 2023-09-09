import React, { ReactNode, useMemo, useState } from 'react';
import { Board } from "@/interfaces";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodo } from "@/models/response/TodoResponse";
import TodoCard from './TodoCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ModalCreateTodo from './ModalCreateTodo';
import AddButton from './AddButton';

const cardStyles = {
    'completed': 'border-green-500 bg-green-200 ',
    'active': 'border-yellow-500 bg-yellow-200 ',
    'inprocess': 'border-blue-500 bg-blue-200 ',
    'cancelled': 'border-red-500 bg-red-200 '
}

const boardHoverStyles = {
    'completed': 'bg-green-400',
    'active': 'bg-yellow-400',
    'inprocess': 'bg-blue-400',
    'cancelled': 'bg-red-400'
}

const backDrop = {
    'completed': 'bg-green-400',
    'active': 'bg-yellow-400',
    'inprocess': 'bg-blue-400',
    'cancelled': 'bg-red-400'
}

const BoardElem: React.FC<Board> = ({ items, type, dragLeaveHandler, dragOverHandler, dragStartHandler, dragEndHandler, isDraggable, currentBoard, todoStore }) => {
    const [createTodoOpen, setOpen] = useState(false)

    const itemsToRender: ReactNode[] | ReactNode = useMemo(() => {
        const filtered: ITodo[] = items.filter(e => e.status === type)
        return filtered.map(e => {
            return (
                <TodoCard todoStore={todoStore} dragEndHandler={dragEndHandler} key={e.id}
                    dragStartHandler={dragStartHandler}
                    draggable={!todoStore.isLoading && isDraggable} item={e} />
            )

        })
    }, [items, type, todoStore.isLoading, isDraggable, dragEndHandler, dragStartHandler])

    const handleClose = () => {
        setOpen(false)
    }

    const addtodo = () => {
        setOpen(true)
    }

    return (
        <Box onDragLeave={(e) => { dragLeaveHandler(e) }} onDragEnter={(e) => { dragOverHandler(e, type) }}
            sx={{ width: '48%' }}
            className={` smallMax:w-full ${currentBoard === type && boardHoverStyles[type]} relative transition-all duration-500 flex shrink-0 grow-1 gap-1 dragDrop flex-col ${cardStyles[type]} p-4 items-center border-4 rounded-md shadow-md shadow-black`}>
            <Typography className='select-none uppercase text-gray-700' variant='h4'>
                {type}
            </Typography>
            {itemsToRender}
            <Backdrop
                sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={todoStore.isLoading}
                className={`${backDrop[type]}}`}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <ModalCreateTodo todoStore={todoStore} onClose={handleClose} isOpen={createTodoOpen} status={type} />
            <AddButton onClick={addtodo} />
        </Box>
    );
};

export default observer(BoardElem);