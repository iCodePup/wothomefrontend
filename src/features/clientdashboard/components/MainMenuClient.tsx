import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import House from '@mui/icons-material/House';
import EmojiObjects from '@mui/icons-material/EmojiObjects';
import AccountTree from '@mui/icons-material/AccountTree';
import DashboardClientBody from './DashboardClientBody';
import {ClientThingsDataGrid} from "@/features/clientthings/components/ClientThingsDataGrid";


// @ts-ignore
export function MainMenuClient({updateBody}) {

    return (<React.Fragment>
        <ListItemButton onClick={(event) => {
            updateBody(<DashboardClientBody/>)
        }}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Accueil"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<ClientThingsDataGrid/>)
        }}>
            <ListItemIcon>
                <House/>
            </ListItemIcon>
            <ListItemText primary="Plan de maison"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<ClientThingsDataGrid/>)
        }}>
            <ListItemIcon>
                <EmojiObjects/>
            </ListItemIcon>
            <ListItemText primary="Ma maison connecté"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<ClientThingsDataGrid/>)
        }}>
            <ListItemIcon>
                <AccountTree/>
            </ListItemIcon>
            <ListItemText primary="Scénario domotique"/>
        </ListItemButton>
    </React.Fragment>)
}
