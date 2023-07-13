import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useThingsInStore} from "@/features/adminmanagethings/api/getThingInStore";

import {Alert, CircularProgress} from "@mui/material";
import {useClients} from "@/features/admindashboard/api/getClients";


export default function DashboardAdminBody() {

    const thingsInStoreQuery = useThingsInStore();
    const clientsQuery = useClients();

    if (thingsInStoreQuery.isLoading || clientsQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingsInStoreQuery.data) return null;
    if (!clientsQuery.data) return null;

    const selledThingInStore = thingsInStoreQuery.data.filter(item =>
        item.client !== null
    );

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <div>Bienvenue sur le tableau de bord d'administration de WOTStore</div>
            </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                <Alert severity="info">Nombre d'objets à la vente : {thingsInStoreQuery.data.length}</Alert>
                <p></p>
                <Alert severity="success">Nombre d'objets vendus : {selledThingInStore.length}</Alert>

            </Paper>
        </Grid>
        {/* Nb de clients */}
        <Grid item xs={12} md={4} lg={6}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                <Alert severity="info">Nombre de clients : {clientsQuery.data.length}</Alert>
            </Paper>
        </Grid>
    </Grid>);

}
