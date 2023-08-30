'use client'
import { ITodo, statusType, availableStatuses } from "@/models/response/TodoResponse";
import { Box, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Select, MenuItem } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { SelectChangeEvent } from "@mui/material/Select";
import { IBoardItem } from "@/interfaces";
import { TodoStoreContext } from "@/context/TodoStoreContext";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";

interface IValues {
    text: string;
    status: statusType;
}

interface TodoCardProps extends IBoardItem {
    item: ITodo;
}
const cardStyles = {
    'completed': 'border-green-500 bg-green-200 hover:bg-green-300',
    'active': 'border-yellow-500 bg-yellow-200 hover:bg-yellow-300',
    'inprocess': 'border-blue-500 bg-blue-200 hover:bg-blue-300',
    'cancelled': 'border-red-500 bg-red-200 hover:bg-red-300'
}

const TodoCard: React.FC<TodoCardProps> = ({ item, draggable, dragStartHandler, dragEndHandler }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [values, setValues] = useState<IValues>({
        status: item.status,
        text: item.text
    } as IValues);


    const { todoStore } = useContext(TodoStoreContext);

    const onSelectChange = (e: SelectChangeEvent) => {
        setValues((prevState) => {
            return {
                ...prevState,
                status: e.target.value as statusType,
            }
        })
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevState) => {
            return {
                ...prevState,
                text: e.target.value,
            }
        })

    }
    const onDeleteClick = () => {
        todoStore.deleteTodo(item)
    }

    const onConfirm = () => {
        if (values.text === item.text && values.status === item.status) {
            return toast.error('you didnt change anything')
        }
        todoStore.updateTodo({
            ...item,
            status: values.status,
            text: values.text,
        })
        setIsEdit(false)
    }

    return (
        <div
            draggable={(draggable && !isEdit)}
            onClick={(e) => {
                e.stopPropagation()
                if (e.detail === 2) {
                    setIsEdit(!isEdit);
                }
            }}
            onDragStart={(e) => dragStartHandler(e, item, item.status)}
            onDragEnd={(e) => dragEndHandler(e)}
            className="flex"
        >
            <Box
                sx={{ cursor: `${isEdit ? 'standard' : 'grab'}` }}
                className={`flex items-center border-2  gap-1 shrink rounded-md p-2 aFull flex-wrap ${cardStyles[item.status]}`}
            >
                <Box className=' flex grow justify-between items-start gap-2'>
                    {isEdit ? <TextField onInput={onInputChange} variant="outlined" placeholder={item.text}></TextField> :
                        <Typography className={`${item.status === 'cancelled' && 'line-through'}  px-2 py-1 break-all overflow-y-auto`}>
                            {item.text}
                        </Typography>}

                    {isEdit && <Select
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.status}
                        label="Age"
                        onChange={onSelectChange}
                    >
                        {availableStatuses.map(e => {
                            return <MenuItem key={e} value={e}>{e}</MenuItem>
                        })}
                    </Select>
                    }
                </Box>

                <Box className={`flex grow ${isEdit ? 'justify-around items-center' : 'justify-end'} `}>
                    {isEdit ? <IconButton onClick={onConfirm}>
                        <CheckIcon />
                    </IconButton> : <IconButton className='self-end justify-self-end' onClick={() => {
                        setIsEdit(true)
                    }}><EditIcon /></IconButton>}


                    {isEdit && <IconButton onClick={onDeleteClick}>
                        <DeleteIcon />
                    </IconButton>}


                    {isEdit && <IconButton onClick={() => setIsEdit(false)}>
                        <CloseIcon />
                    </IconButton>}
                </Box>

            </Box>
        </div>

    )
}

export default TodoCard;