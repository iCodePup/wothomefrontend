import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import House from '@mui/icons-material/House';
import EmojiObjects from '@mui/icons-material/EmojiObjects';
import AccountTree from '@mui/icons-material/AccountTree';
import DashboardUserBody from './DashboardUserBody';
import {HousePlanDataGrid} from "@/features/houseplan/components/HousePlanDataGrid";
import HomeAutomation from '@/features/homeautomation/components/HomeAutomation';
import {SceneDataGrid} from '@/features/scene/components/SceneDataGrid';


// @ts-ignore
export function MainMenuUser({updateBody}) {

    return (<React.Fragment>
        <ListItemButton onClick={(event) => {
            updateBody(<DashboardUserBody/>)
        }}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Accueil"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<HousePlanDataGrid/>)
        }}>
            <ListItemIcon>
                <House/>
            </ListItemIcon>
            <ListItemText primary="Plan de maison"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<HomeAutomation/>)
        }}>
            <ListItemIcon>
                <EmojiObjects/>
            </ListItemIcon>
            <ListItemText primary="Ma maison connectée"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<SceneDataGrid/>)
        }}>
            <ListItemIcon>
                <AccountTree/>
            </ListItemIcon>
            <ListItemText primary="Scénario domotique"/>
        </ListItemButton>
    </React.Fragment>)
}
