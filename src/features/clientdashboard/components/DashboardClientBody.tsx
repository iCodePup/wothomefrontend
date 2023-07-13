import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {Alert, CircularProgress} from "@mui/material";
import {useUser} from "@/lib/auth";
import {useAvailableThingsInStore} from "@/features/clientdashboard/api/getAvailableThingInStore";
import {useClientThings} from "@/features/clientdashboard/api/getClientThingInStore";


export default function DashboardClientBody() {

    const thingsInStoreAvailableQuery = useAvailableThingsInStore();
    const clientThingsAvailableQuery = useClientThings();
    const auth = useUser();

    if (thingsInStoreAvailableQuery.isLoading || clientThingsAvailableQuery.isLoading ||  auth.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingsInStoreAvailableQuery.data) return null;
    if (!clientThingsAvailableQuery.data) return null;
    if (!auth.data) return null;

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <div>Bonjour {auth.data.firstName} {auth.data.lastName}. Bienvenue sur la boutique d'objet connecté
                    WOTStore
                </div>
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
                <Alert severity="info">Nombre d'objets à la vente : {thingsInStoreAvailableQuery.data.length}</Alert>
                <p></p>
                <Alert severity="success">Mes objets connectés : {clientThingsAvailableQuery.data.length}</Alert>

            </Paper>
        </Grid>

    </Grid>);

}
