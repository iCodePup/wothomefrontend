import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, GridActionsCellItem} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress, Tooltip} from "@mui/material";
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
import {useRules} from "@/features/scene/api/getScenes";
import {Expression} from "@/features/scene/types";
import SceneToolbar from "@/features/scene/components/SceneToolbar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {DiscoveredThingsDataGrid} from "@/features/discoverthings/components/DiscoveredThingsDataGrid";


export function SceneDataGrid() {

    const rules = useRules();
    const addClientThing = useAddClientThing();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [currentRow, setRow] = React.useState();
    const [open, setOpen] = React.useState(false);
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

    if (rules.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!rules.data) return null;

    const columns = [
        {
            field: "id",
            headerName: "Identifiant",
            width: 20,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            valueOptions: [],
            editable: false,
        },
        {
            field: "name",
            headerName: "Nom",
            width: 30,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
        },
        {
            field: "triggerExpressionDTO",
            headerName: "Déclencheur",
            type: "string",
            minWidth: 300,
            flex: 1,
            editable: false,
            valueFormatter: ({value}: any) => {
                if (value) {
                    return formatExpression(value);
                }
            }
        },
        {
            field: "actionDTO",
            headerName: "Action",
            type: "string",
            minWidth: 50,
            flex: 1,
            editable: false,
            valueFormatter: ({value}: any) => {
                if (value) {
                    return formatAction(value);
                }
            }
        }
    ];


    const formatAction = (action: any): string => {

        return `${action.thingDTO.name} avec ${action.property} à ${action.value}`;

    };

    const formatExpression = (expression: Expression): string => {
        if (expression.type === "thing") {
            return `${expression.thingDTO.name} avec ${expression.property} à ${expression.value}`;
        } else if (expression.type === "and" || expression.type === "or") {
            const first = formatExpression(expression.firstExpression!);
            const second = formatExpression(expression.secondExpression!);
            return `(${first} ${expression.type.toUpperCase()} ${second})`;
        } else {
            return "";
        }
    };


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
                    rows={rules.data}
                    columns={columns}
                    defaultPageSize={undefined}
                    onSaveRow={undefined}
                    onDeleteRow={undefined}
                    createRowData={undefined}
                    onProcessRowUpdateError={undefined}
                    slots={{
                        toolbar: SceneToolbar
                    }}
                />

            </Paper>
        </Grid>
    </Grid>)
}
