import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, GridActionsCellItem} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress} from "@mui/material";
import {useRules} from "@/features/scene/api/getScenes";
import {Expression} from "@/features/scene/types";
import SceneToolbar from "@/features/scene/components/SceneToolbar";
import {Delete} from "@mui/icons-material";
import {useDeleteRule} from "@/features/scene/api/deleteRule";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


export function SceneDataGrid() {

    const rules = useRules();
    const deleteRuleMutation = useDeleteRule();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [currentRow, setRow] = React.useState();

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

    const handleClickDelete = () => {
        console.log("handleClickDelete")
        console.log(currentRow)
        if (currentRow) {
            // @ts-ignore
            deleteRuleMutation.mutateAsync(currentRow.id)
            setOpenDelete(false);
        }
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

                return [
                    <GridActionsCellItem
                        icon={<Delete/>}
                        label="Delete"
                        className="textPrimary"
                        onClick={handleOpenDelete(row)}
                        color="inherit"
                    />
                ];

            }
        }
    ];

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleOpenDelete = (row: any) => async () => {
        setRow(row);
        setOpenDelete(true);
    }


    return (<Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Dialog
                    open={openDelete}
                    keepMounted
                    onClose={handleCloseDelete}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Voulez vous supprimer cette règle ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete}>Non</Button>
                        <Button onClick={handleClickDelete}>Oui</Button>
                    </DialogActions>
                </Dialog>
                <FullFeaturedCrudGrid
                    readOnly={true}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    rows={rules.data}
                    columns={newColmuns}
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
