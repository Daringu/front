'use client'
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { ReactNode } from "react";

import { observer } from "mobx-react-lite";
import { useNavLinks } from "@/hooks/navLinks";

interface DrawerProps {
    handleBurgerClick: () => void;
    isDrawerOpen: boolean;
    children: ReactNode
}

const NavDrawer: React.FC<DrawerProps> = ({ handleBurgerClick, isDrawerOpen, children }) => {
    const links = useNavLinks();
    return (
        <Drawer onClose={handleBurgerClick} open={isDrawerOpen} anchor={'right'}>
            <Box className="flex flex-col gap-2 items-start" sx={{ p: '4rem' }}>
                {links.map(e => {
                    return (
                        <IconButton sx={{ borderRadius: '0', display: `${e.visible ? 'flex' : 'none'}` }} key={e.id} onClick={e.onClick}>
                            <e.Icon />
                            {e.text && <Typography variant={"h5"}>{e.text}</Typography>}

                            {e.id === 'mail' && <Typography className=" text-red-700">{(e.quantity!) > 0 && e.quantity}</Typography>}
                        </IconButton>
                    )
                })}
            </Box>
        </Drawer>
    );
};

export default observer(NavDrawer);
