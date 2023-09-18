import React, { useState, useContext } from "react";
import { ITodo, statusType, availableStatuses } from "@/models/response/TodoResponse";
import { Box, TextField, Typography, IconButton, Select, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import PopOver from "./PopOver";
import { IBoardItem } from "@/interfaces";
import TodoStore from "@/stores/TodoStore";
import { AuthStoreContext } from "@/context/AuthStoreContext";

interface IValues {
    text: string;
    status: statusType;
}

interface TodoCardProps extends IBoardItem {
    item: ITodo;
    todoStore: TodoStore;
}

const cardStyles = {
    'completed': 'border-green-500 bg-green-200 hover:bg-green-300',
    'active': 'border-yellow-500 bg-yellow-200 hover:bg-yellow-300',
    'inprocess': 'border-blue-500 bg-blue-200 hover:bg-blue-300',
    'cancelled': 'border-red-500 bg-red-200 hover:bg-red-300'
};

const TodoCard: React.FC<TodoCardProps> = ({ item, draggable, dragStartHandler, dragEndHandler, todoStore }) => {
    const { AuthStore } = useContext(AuthStoreContext);
    const [isEdit, setIsEdit] = useState(false);
    const [values, setValues] = useState<IValues>({
        status: item.status,
        text: item.text
    });

    const onSelectChange = (e: any) => {
        setValues((prevState) => ({
            ...prevState,
            status: e.target.value as statusType,
        }));
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevState) => ({
            ...prevState,
            text: e.target.value,
        }));
    };

    const onDeleteClick = () => {
        todoStore.deleteTodo(item);
    };

    const onConfirm = (e: any) => {
        e.stopPropagation();
        if (values.text === item.text && values.status === item.status) {
            return toast.error('You didn\'t change anything');
        }

        todoStore.updateTodo({
            ...item,
            status: values.status,
            text: values.text,
            takenBy: values.status === 'active' ? 'none' : AuthStore.user.username
        });

        setIsEdit(false);
    };

    const handleDoubleClick = () => {
        if (todoStore.mode === 'team' && item.status !== 'active' && item.takenBy !== AuthStore.user.username) {
            return;
        }
        setIsEdit(!isEdit);
    };

    return (
        <div
            draggable={(draggable && !isEdit && todoStore.mode !== 'team') || (todoStore.mode === 'team' && item.status === 'active') || (todoStore.mode === 'team' && item.takenBy === AuthStore.user.username)}
            onClick={(e) => {
                e.stopPropagation();
                handleDoubleClick();
            }}
            onDragStart={(e) => dragStartHandler(e, item, item.status)}
            onDragEnd={dragEndHandler}
            className="flex"
        >
            <Box
                sx={{ cursor: `${isEdit ? 'standard' : 'grab'}` }}
                className={`flex items-center border-2  gap-1 max-h-28 rounded-md p-2 w-full flex-wrap ${cardStyles[item.status]}`}
            >
                <Box className='flex grow justify-between items-start gap-2'>
                    {isEdit ? (
                        <TextField
                            onInput={onInputChange}
                            variant="outlined"
                            placeholder={item.text}
                        />
                    ) : (
                        <Typography className={`${item.status === 'cancelled' && 'line-through'}  px-2 py-1 break-all overflow-y-auto`}>
                            {item.text}
                        </Typography>
                    )}
                    {isEdit && (
                        <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.status}
                            label="Status"
                            onChange={onSelectChange}
                        >
                            {availableStatuses.map((e) => (
                                <MenuItem key={e} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </Box>
                {(todoStore.mode === 'single' || (todoStore.mode === 'team' && item.status === 'active') || item.takenBy === AuthStore.user.username) && (
                    <Box className={`flex grow ${isEdit ? 'justify-around items-center' : 'justify-end'} `}>
                        {isEdit ? (
                            <IconButton onClick={onConfirm}>
                                <CheckIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                className='self-end justify-self-end'
                                onClick={() => {
                                    setIsEdit(true);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        )}

                        {isEdit && (
                            <IconButton onClick={onDeleteClick}>
                                <DeleteIcon />
                            </IconButton>
                        )}

                        {isEdit && (
                            <IconButton onClick={() => setIsEdit(false)}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                )}
                {todoStore.mode === 'team' && (
                    <PopOver classes="py-3 px-4" id="info" text="info">
                        <Typography>
                            Created by: {item.createdBy}
                        </Typography>
                        <Typography>
                            Taken by: {item.takenBy}
                        </Typography>
                        <Typography>
                            Updated at: {item.updatedAt}
                        </Typography>
                    </PopOver>
                )}
            </Box>
        </div>
    );
};

export default observer(TodoCard);
