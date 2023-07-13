import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {Alert, CircularProgress} from "@mui/material";
import {useUser} from "@/lib/auth";
import {useUserThing} from "@/features/clientdashboard/api/getUserThings";



export default function DashboardClientBody() {

    const userThings = useUserThing();
    const auth = useUser();

    if (userThings.isLoading ||  auth.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!userThings.data) return null;
    if (!auth.data) return null;

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <div>Bonjour {auth.data.firstName} {auth.data.lastName}. Bienvenue sur votre plateforme d'objet connecté
                    WOTHome
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
                <Alert severity="info">TODO recherches des objets connectés...page de base liste (datagrid) de mes objets connectés avec possibilité de leur choisir une piece en mode edition +fenetere de recherche avec websocket</Alert>



            </Paper>
        </Grid>

    </Grid>);

}
