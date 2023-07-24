import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {Alert, CircularProgress} from "@mui/material";
import {useUser} from "@/lib/auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {DiscoveredThingsDataGrid} from "@/features/discoverthings/components/DiscoveredThingsDataGrid";
import {UserThingsDataGrid} from "@/features/userthings/components/UserThingsDataGrid";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
export default function DashboardUserBody() {

    const auth = useUser();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if ( auth.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }

    if (!auth.data) return null;

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6" gutterBottom>Bonjour {auth.data.firstName} {auth.data.lastName}. Bienvenue sur votre plateforme d'objet connecté
                    WOTHome
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <UserThingsDataGrid/>
            </Paper>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Button onClick={handleOpen}><TravelExploreIcon/> &nbsp; Rechercher des objets connectés </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <DiscoveredThingsDataGrid/>
                    </Box>
                </Modal>

            </Paper>
        </Grid>
    </Grid>);
}
