import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import { useAuthState } from '../providers/AuthProvider/hooks/useAuthState';
import { useState } from 'react';
import { useAuthDispatcher } from '../providers/AuthProvider/hooks/useAuthDispatcher';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate()
    const { logout } = useAuthDispatcher()
    const { authState: { isLogged, user } } = useAuthState()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        logout()
        onClose()
        navigate('/login')
    };

    return (
        <Box sx={{ flexGrow: 1, mb: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "end" }}>
                    {
                        isLogged && (
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center"}}>
                                    <Box sx={{ mr: 2}}>
                                        <Typography variant="subtitle1">{user ? user.username : ""}</Typography>
                                    </Box>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Box>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    onClose={onClose}
                                    open={Boolean(anchorEl)}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
