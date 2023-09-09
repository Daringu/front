import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ITodo, statusType } from "@/models/response/TodoResponse";
import { BoardStoreContext } from '@/context/BoardStoreContext';
import { observer } from "mobx-react-lite";
import BoardElem from "@/components/Board";
import { Container, } from '@mui/material';
import Loading from '@/app/(site)/loading';
import TodoStore from '@/stores/TodoStore';


interface BoardsProps {
    types: statusType[];
    id: string;
    isSingle: boolean;
}

const Boards: React.FC<BoardsProps> = ({ types, id, isSingle }) => {
    const [todoStore, setTodoStore] = useState<TodoStore>(() => { return new TodoStore(isSingle) })

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

    if (todoStore.isLoading) {
        return <Loading />
    }
    return (
        <Container className='flex flex-wrap gap-4 items-start justify-between '>
            {types.map(e => {
                return (<BoardElem todoStore={todoStore} currentItem={boardStore.currentItem}
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