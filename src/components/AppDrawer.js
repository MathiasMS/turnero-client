import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import UBLogo from '../images/UB-logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../providers/AuthProvider/hooks/useAuthState';
import { useState } from 'react';

const drawerWidth = 240;

const optionIcon = {
    categories: CategoryIcon,
    procedures: BrandingWatermarkIcon
}

const optionsList = [
    {
        path: '/tramites',
        label: 'Tramites',
        icon: 'procedures'
    },
    {
        path: '/categorias',
        label: 'Categorias',
        icon: 'categories'
    }
]

const AppDrawer = () => {
    const navigate = useNavigate()
    const { authState: { isLogged } } = useAuthState()
    const [selectedOption, setSelectedOption] = useState('Tramites')

    if(isLogged) {
        return ( <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open
        >
            <img width="auto" src={UBLogo} alt="ub-logo" />
            <List>
                {optionsList.map((option) => {
                    const { label, icon, path} = option

                    const Icon = optionIcon[icon]

                    return (
                        <ListItem key={label} disablePadding onClick={() => {
                            setSelectedOption(label)
                            navigate(path);
                        }} sx={{ color: selectedOption === label ? "#007FFF" : 'grey'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon sx={{ color: selectedOption === label ? "#007FFF" : 'grey'}}/>
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
        </Drawer>)
    }

    return null
}

export default AppDrawer
