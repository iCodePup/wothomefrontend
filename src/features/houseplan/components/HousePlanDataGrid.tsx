import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress} from "@mui/material";
import {useRooms} from "@/features/houseplan/api/getRooms";
import {useAddRoom} from "@/features/houseplan/api/addRoom";
import {useDeleteRoom} from "@/features/houseplan/api/deleteRoom";



export function HousePlanDataGrid() {

    const rommsQuery = useRooms();
    const addRoomMutation = useAddRoom();
    const deleteRoomMutation = useDeleteRoom();

    if (rommsQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!rommsQuery.data) return null;


    const columns = [
        {
            field: "id",
            headerName: "Id",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "name",
            headerName: "Pièce",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "surface",
            headerName: "Surface",
            width: 200,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: true,
        },
    ];
    //
    // @ts-ignore
    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }
        await addRoomMutation.mutateAsync({
            id: id,
            name: updatedRow.name,
            surface: updatedRow.surface
        });
    };

    // @ts-ignore
    const onDeleteRow = async (id, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }
        await deleteRoomMutation.mutateAsync(id)
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
                    rows={rommsQuery.data}
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
