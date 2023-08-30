import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ITodo, statusType } from "@/models/response/TodoResponse";
import { BoardStoreContext } from '@/context/BoardStoreContext';
import { observer } from "mobx-react-lite";
import { TodoStoreContext } from "@/context/TodoStoreContext";
import BoardElem from "@/components/Board";
import { Container, } from '@mui/material';
import Loading from '@/app/(site)/loading';


interface BoardsProps {
    types: statusType[];
}

const Boards: React.FC<BoardsProps> = ({ types }) => {
    const { todoStore } = useContext(TodoStoreContext);
    const { boardStore } = useContext(BoardStoreContext)
    const [fetch, setFetch] = useState(false)

    const dragEndHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (boardStore.currentBoard !== boardStore.initBoard) {
            todoStore.updateTodo({ ...boardStore.currentItem, status: boardStore.currentBoard })
        }
        boardStore.setIsDraggable(true)
        boardStore.setCurrentBoard('' as statusType)
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
        const fetchTodos = async () => {
            setFetch(true);
            try {
                await todoStore.getTodos()
            } catch (error) {
                console.log(error);
            } finally {
                setFetch(false)
            }
        }
        fetchTodos();
    }, []);

    if (fetch) {
        return <Loading />
    }
    return (
        <Container className='flex flex-wrap gap-4 items-start justify-between '>
            {types.map(e => {
                return (<BoardElem currentItem={boardStore.currentItem}
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