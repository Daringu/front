'use client'
import { Box } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { observer } from "mobx-react-lite";

interface DelteConfirmProps {
    onConfirm: () => void;
}

function DelteConfirm({ onConfirm }: DelteConfirmProps) {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    return (
        <Box>
            {isDelete ? <Box>
                <button onClick={(e) => {
                    e.stopPropagation()
                    onConfirm();
                    setIsDelete(false);
                }} type="button">
                    <CheckIcon />
                </button>
                <button onClick={(e) => {
                    e.stopPropagation()
                    setIsDelete(false)
                }} type="button">
                    <CloseIcon />
                </button>

            </Box> : <button onClick={(e) => {
                e.stopPropagation()
                setIsDelete(true)
            }}><DeleteIcon /></button>}
        </Box>
    )
}

export default observer(DelteConfirm)