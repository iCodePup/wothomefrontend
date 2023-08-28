import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, GridActionsCellItem} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress} from "@mui/material";
import ReadOnlyToolbar from "@/components/datagrid/ReadOnlyToolbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {AddCircle} from '@mui/icons-material';
import {useThings} from "@/features/discoverthings/api/getThings";
import {useAddClientThing} from "@/features/discoverthings/api/addClientThing";
import {Thing} from "@/features/discoverthings/types";


export function DiscoveredThingsDataGrid() {

    const things = useThings();
    const addClientThing = useAddClientThing();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [currentRow, setRow] = React.useState();

    if (things.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!things.data) return null;

    const columns = [
        {
            field: "id",
            headerName: "Identifiant",
            width: 200,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            valueOptions: [],
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
            field: "url",
            headerName: "URL",
            width: 300,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
            renderCell: ({value}: { value: any }) => {
                if (value) {
                    return (<a href={value} target="_blank">{value}</a>)
                }
            }
        },
        {
            field: "alive",
            headerName: "En ligne",
            width: 300,
            headerAlign: "center",
            type: "boolean",
            align: "center",
            editable: false,
        }
    ];

    const handleClickAdd = (row: any) => async () => {
        setOpenAdd(true);
        setRow(row.row);
    };


    const handleAddClick = () => {
        if (currentRow) {
            addClientThing.mutateAsync(currentRow)
        }
        setOpenAdd(false);

    };


    const handleCloseAdd = () => {
        setOpenAdd(false);
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
                let thingInStore = row.row as Thing

                return [
                    <GridActionsCellItem
                        icon={<AddCircle/>}
                        label="Add"
                        className="textPrimary"
                        onClick={handleClickAdd(row)}
                        color="inherit"
                    />
                ];

            }
        }
    ];

    return (<Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Dialog
                    open={openAdd}
                    keepMounted
                    onClose={handleCloseAdd}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Voulez vous ajouter cet objet connecté ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Non</Button>
                        <Button onClick={handleAddClick}>Oui</Button>
                    </DialogActions>
                </Dialog>
                <FullFeaturedCrudGrid
                    readOnly={true}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={newColmuns}
                    rows={things.data}
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
