'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ITodo, statusType } from "@/models/response/TodoResponse";
import { observer } from "mobx-react-lite";
import BoardElem from "@/components/Board";
import { Container, } from '@mui/material';
import TodoStore from '@/stores/TodoStore';
import BoardStore from '@/stores/BoardStore';
import { ioServer } from '@/ioServer';
import { AuthStoreContext } from '@/context/AuthStoreContext';

interface BoardsProps {
    types: statusType[];
    mode: 'single' | 'team';
    teamId?: string;
    todoStore: TodoStore;
}

const Boards: React.FC<BoardsProps> = ({ types, mode, teamId, todoStore }) => {
    const { AuthStore } = useContext(AuthStoreContext)
    const [boardStore, setBoardStore] = useState<BoardStore>(() => { return new BoardStore() })

    useEffect(() => {
        return () => {
            if (teamId) {
                ioServer.emit('leave-team', teamId)
            }
        }
    }, [teamId])


    const dragEndHandler = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (boardStore.currentBoard !== boardStore.initBoard) {
            await todoStore.updateTodo({ ...boardStore.currentItem, status: boardStore.currentBoard, takenBy: boardStore.currentBoard === 'active' ? 'none' : AuthStore.user.username })
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
    useEffect(() => {
        todoStore.getTodos()
    }, [])
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