import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ITodo, statusType } from "@/models/response/TodoResponse";
import { observer } from "mobx-react-lite";
import BoardElem from "@/components/Board";
import { Container, } from '@mui/material';
import TodoStore from '@/stores/TodoStore';
import BoardStore from '@/stores/BoardStore';
import { io } from 'socket.io-client';
import { URL } from '@/http';
import { AuthStoreContext } from '@/context/AuthStoreContext';
import { toast } from 'react-toastify';

interface BoardsProps {
    types: statusType[];
    id: string;
    isSingle: boolean;
}

const Boards: React.FC<BoardsProps> = ({ types, id, isSingle }) => {
    const [todoStore, setTodoStore] = useState<TodoStore>(() => { return new TodoStore(isSingle) })
    const [boardStore, setBoardStore] = useState<BoardStore>(() => { return new BoardStore() })
    const [fetch, setFetch] = useState(false)
    const { AuthStore } = useContext(AuthStoreContext)
    useEffect(() => {
        const socket = io(URL, { transports: ['websocket'] });
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('disconnect', () => {
            console.log('disconnected')
        })
        socket.on('message', (msg) => {
            toast(msg)
        })
        setTimeout(() => {
            socket.emit('message', `ti loh from ${AuthStore.user.username}`)
        }, 10000)
        return () => {
            socket.disconnect()
        }
    }, [])
    const dragEndHandler = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (boardStore.currentBoard !== boardStore.initBoard) {
            await todoStore.updateTodo({ ...boardStore.currentItem, status: boardStore.currentBoard })
        }
        boardStore.setIsDraggable(true)
        boardStore.discard()
    }, [todoStore, boardStore])

    const dragStartHandler = useCallback((e: React.DragEvent<HTMLDivElement>, item: ITodo, type: statusType) => {
        boardStore.setCurrentItem(item);
        boardStore.setInitBoard(type);
        boardStore.setIsDraggable(false)
    }, [boardStore])

    const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>, type: statusType) => {
        e.preventDefault();
        boardStore.setCurrentBoard(type);
    }, [boardStore])

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <Container className='flex flex-wrap gap-4 items-start justify-between '>
            {types.map(e => {
                return (<BoardElem todoStore={todoStore} currentItem={boardStore.currentItem}
                    boardStore={boardStore}
                    currentBoard={boardStore.currentBoard}
                    isDraggable={boardStore.isDraggable}
                    dragEndHandler={dragEndHandler}
                    dragLeaveHandler={dragLeaveHandler}
                    dragStartHandler={dragStartHandler}
                    dragOverHandler={dragOverHandler}
                    key={e}
                    type={e}
                    items={todoStore.todos} />)
            })}
        </Container>
    );
};

export default observer(Boards);