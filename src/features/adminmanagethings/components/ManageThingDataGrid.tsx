import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {useThingTypes} from "@/features/adminmanagethings/api/getThingType";
import {CircularProgress} from "@mui/material";
import {useThingsInStore} from "@/features/adminmanagethings/api/getThingInStore";
import {useCreateThingInStore} from "@/features/adminmanagethings/api/createThingInStore";
import {useDeleteThingInStore} from '../api/deleteThingInStore';


export function ManageThingDataGrid() {

    const thingTypesQuery = useThingTypes();
    const thingsInStoreQuery = useThingsInStore();
    const createThingInStoreMutation = useCreateThingInStore();
    const deleteThingInStoreMutation = useDeleteThingInStore();

    if (thingsInStoreQuery.isLoading || thingTypesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingsInStoreQuery.data) return null;
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
            editable: true,
        },
        {
            field: "name",
            headerName: "Nom",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "prix",
            headerName: "Prix",
            width: 25,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: true,
        },
        {
            field: "client",
            headerName: "Client",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
            renderCell: ({value}: { value: any }) => {
                if( value) {
                    return value.firstName + " " + value.lastName + " (" + value.email + ")"
                }
            }
        }
    ];
    //
    // @ts-ignore
    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }
        console.log(id)
        await createThingInStoreMutation.mutateAsync({
            description: updatedRow.description,
            id: id,
            name: updatedRow.name,
            prix: updatedRow.prix,
            thingId: updatedRow.thingId,

        });
    };

    // @ts-ignore
    const onDeleteRow = async (id, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }
        await deleteThingInStoreMutation.mutateAsync(id)
    };

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <FullFeaturedCrudGrid
                    readOnly={false}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={thingsInStoreQuery.data}
                    defaultPageSize={undefined}
                    onSaveRow={onSaveRow}
                    onDeleteRow={onDeleteRow}
                    createRowData={undefined}
                    onProcessRowUpdateError={undefined}
                />
            </Paper>
        </Grid>
    </Grid>)
}
