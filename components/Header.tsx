import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavLinks } from "@/hooks/navLinks";
import CheckIcon from '@mui/icons-material/Check';
import { observer } from "mobx-react-lite";
import { Container } from "@mui/material";
import { AuthStoreContext } from "@/context/AuthStoreContext";
import { useContext } from "react";


interface HeaderProps {
    onClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onClick }) => {
    const { AuthStore } = useContext(AuthStoreContext);
    const links = useNavLinks();
    return (
        <AppBar position={'static'}>
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton color={'inherit'} sx={{ flexGrow: 0, display: 'flex', alignItems: 'flex-center', gap: '0.5rem', borderRadius: '0' }}>
                        TODO
                        <CheckIcon sx={{ scale: '1.5' }} />
                    </IconButton>
                    <Box className="largeMax:hidden gap-1 flex">
                        {links.map(e => {
                            return (
                                <IconButton className="border-solid  border-2 rounded-sm border-sky-600" color={'inherit'} sx={{ borderRadius: '0', display: `${e.visible ? 'flex' : 'none'}` }} key={e.id} onClick={e.onClick}>
                                    <e.Icon />
                                    {e.text && <Typography variant={"h5"}>{e.text}</Typography>}
                                    {e.id === 'mail' && <Typography className=" text-red-700">{(e.quantity!) > 0 && e.quantity}</Typography>}
                                </IconButton>
                            )
                        })}
                    </Box>
                    <IconButton className="largeMax:flex hidden" onClick={onClick} color={"inherit"}>
                        <MenuIcon sx={{ scale: '1.8' }} />
                    </IconButton>
                </Toolbar>
            </Container>

        </AppBar>
    );
};

export default observer(Header)
