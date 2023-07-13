import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmojiObjects from '@mui/icons-material/EmojiObjects';
import DashboardClientBody from './DashboardClientBody';
import {ClientThingInStoreDataGrid} from '@/features/clientthinginstore/components/ClientThingInStoreDataGrid';
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
            updateBody(<ClientThingInStoreDataGrid/>)
        }}>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Consulter la boutique"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<ClientThingsDataGrid/>)
        }}>
            <ListItemIcon>
                <EmojiObjects/>
            </ListItemIcon>
            <ListItemText primary="Mes objets connectés"/>
        </ListItemButton>
    </React.Fragment>)
}
