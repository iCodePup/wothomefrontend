import * as React from 'react';
import Grid from "@mui/material/Grid";
import {frFR} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress} from "@mui/material";
import ReadOnlyToolbar from "@/components/datagrid/ReadOnlyToolbar";
import {useUserThing} from "@/features/userthings/api/getUserThings";
import Typography from '@mui/material/Typography';

export function UserThingsDataGrid() {

    const things = useUserThing();

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

    return (<Grid container spacing={3}>
        <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    Mes objets connectés:
                </Typography>
                <FullFeaturedCrudGrid
                    readOnly={true}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
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
        </Grid>
    </Grid>)
}
