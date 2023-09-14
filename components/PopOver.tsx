'use client'

import { Box, Button, Popover } from "@mui/material";
import { useRef, useState } from "react";

interface PopOverProps {
    children: React.ReactNode;
    text: string;
    id: string;
    classes?: string;
}
const PopOver = ({ children, text, id, classes }: PopOverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    return (
        <Box >
            <Button ref={ref} aria-describedby={id} onClick={() => setIsOpen(true)}>
                {text}
            </Button>
            <Popover anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} id={id}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={ref.current}
            >
                {
                    children
                }
            </Popover>
        </Box>
    )
};


export default PopOver;