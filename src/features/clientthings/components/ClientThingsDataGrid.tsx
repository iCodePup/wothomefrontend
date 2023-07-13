import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, GridActionsCellItem} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {useThingTypes} from "@/features/clientthinginstore/api/getThingType";
import {CircularProgress} from "@mui/material";
import ReadOnlyToolbar from "@/components/datagrid/ReadOnlyToolbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useClientThings} from "@/features/clientthings/api/getThingInStore";
import {PlayCircleFilled, StopCircle} from '@mui/icons-material';
import {useStartClientThing} from "@/features/clientthings/api/startClientThing";
import {ThingInStore} from "@/features/clientthings/types";
import {useStopClientThing} from "@/features/clientthings/api/stopClientThing";


export function ClientThingsDataGrid() {

    const thingTypesQuery = useThingTypes();
    const clientThings = useClientThings();
    const startClientThingMutation = useStartClientThing();
    const stopClientThingMutation = useStopClientThing();
    const [openStart, setOpenStart] = React.useState(false);
    const [openStop, setOpenStop] = React.useState(false);
    const [currentRow, setRow] = React.useState();

    if (clientThings.isLoading || thingTypesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!clientThings.data) return null;
    if (!thingTypesQuery.data) return null;

    const columns = [
        {
            field: "thingId",
            headerName: "Type d'objet connecté",
            width: 200,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            valueOptions: thingTypesQuery.data,
            editable: false,
        },
        {
            field: "name",
            headerName: "Nom",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
        }
    ];

    const handleClickStart = (row: any) => async () => {
        setOpenStart(true);
        setRow(row.row);
    };

    const handleClickStop = (row: any) => async () => {
        setOpenStop(true);
        setRow(row.row);
    };

    const handleStartClick = () => {
        if (currentRow) {
            startClientThingMutation.mutateAsync(currentRow)
        }
        setOpenStart(false);
    };


    const handleStopClick = () => {
        if (currentRow) {
            stopClientThingMutation.mutateAsync(currentRow)
        }
        setOpenStop(false);
    };


    const handleCloseStart = () => {
        setOpenStart(false);
    };

    const handleCloseStop = () => {
        setOpenStop(false);
    };

    const newColmuns = [
        ...columns,
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: (row: any) => {
                let thingInStore = row.row as ThingInStore
                if (!thingInStore.started) {
                    return [
                        <GridActionsCellItem
                            icon={<PlayCircleFilled/>}
                            label="Play"
                            className="textPrimary"
                            onClick={handleClickStart(row)}
                            color="inherit"
                        />
                    ];
                } else {
                    return [
                        <GridActionsCellItem
                            icon={<StopCircle/>}
                            label="Stop"
                            className="textPrimary"
                            onClick={handleClickStop(row)}
                            color="inherit"
                        />
                    ];
                }
            }
        }
    ];

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Dialog
                    open={openStart}
                    keepMounted
                    onClose={handleCloseStart}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Voulez vous démarrez cet objet connecté ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseStart}>Non</Button>
                        <Button onClick={handleStartClick}>Oui</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openStop}
                    keepMounted
                    onClose={handleCloseStop}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Voulez vous arreter cet objet connecté ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseStop}>Non</Button>
                        <Button onClick={handleStopClick}>Oui</Button>
                    </DialogActions>
                </Dialog>
                <FullFeaturedCrudGrid
                    readOnly={true}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={newColmuns}
                    rows={clientThings.data}
                    defaultPageSize={undefined}
                    onSaveRow={undefined}
                    onDeleteRow={undefined}
                    createRowData={undefined}
                    onProcessRowUpdateError={undefined}
                    slots={{
                        toolbar: ReadOnlyToolbar
                    }}
                />
            </Paper>
        </Grid>
    </Grid>)
}
