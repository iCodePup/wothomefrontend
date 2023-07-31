import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, useGridApiContext} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {CircularProgress} from "@mui/material";
import {useRooms} from "@/features/houseplan/api/getRooms";
import {useAddRoom} from "@/features/houseplan/api/addRoom";
import {useDeleteRoom} from "@/features/houseplan/api/deleteRoom";
import {useUpdateRoom} from "@/features/houseplan/api/updateRoom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {useUserThing} from "@/features/userthings/api/getUserThings";
import {Thing} from "@/features/discoverthings/types";

export function HousePlanDataGrid() {

    const roomsQuery = useRooms();
    const addRoomMutation = useAddRoom();
    const updateRoomMutation = useUpdateRoom();
    const deleteRoomMutation = useDeleteRoom();
    const things = useUserThing();

    if (roomsQuery.isLoading && things.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!roomsQuery.data) return null;
    if (!things.data) return null;

    const thingsOptions = things.data

    // @ts-ignore
    function CustomEditComponent(props) {

        const {id, value, field} = props;
        const apiRef = useGridApiContext();

        // @ts-ignore
        const handleChange = (event) => {
            const eventValue = event.target.value; // The new value entered by the user
            console.log({eventValue});
            const newValue =
                typeof eventValue === "string" ? value.split(",") : eventValue;
            apiRef.current.setEditCellValue({
                id,
                field,
                value: newValue.filter((x: string) => x !== "")
            });
        };
        let valuesOptions = [];
        if (value) {
            valuesOptions = value;
        }

        return (
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={valuesOptions}
                onChange={handleChange}
                sx={{width: "100%"}}
            >
                {thingsOptions.map((option: Thing) => (
                    <MenuItem key={option.name} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        );
    }

    // @ts-ignore
    const CustomThingsEditCell = (params) => <CustomEditComponent {...params} />;

    // @ts-ignore
    function CustomFilterInputSingleSelect(props) {
        const {item, applyValue, type, apiRef, focusElementRef, ...others} = props;
        return (
            <TextField
                id={`contains-input-${item.id}`}
                value={item.value}
                onChange={(event) => applyValue({...item, value: event.target.value})}
                type={type || "text"}
                variant="standard"
                InputLabelProps={{
                    shrink: true
                }}
                inputRef={focusElementRef}
                select
                SelectProps={{
                    native: true
                }}
            >
                {[...thingsOptions].map((option: Thing) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </TextField>
        );
    }

    // @ts-ignore
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
            headerName: "Surface (m²)",
            width: 200,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: true,
        },
        {
            field: "thingsId",
            headerName: "Objets connectés",
            type: "singleSelect",
            minWidth: 120,
            flex: 1,
            editable: true,
            valueOptions: thingsOptions,
            valueFormatter: ({value}: any) => {
                if (value) {
                    return value.map((thingId: number) => {
                        let founded = thingsOptions.find(x => x.id === thingId)
                        if (founded) {
                            return founded.name
                        }
                    }).join(', ')
                }

                //return (value ? value.join("/") : "")
            },
            renderEditCell: CustomThingsEditCell,
            filterOperators: [
                {
                    value: "contains",
                    getApplyFilterFn: ({filterItem}: any) => {
                        if (filterItem.value == null || filterItem.value === "") {
                            return null;
                        }
                        return ({value}: any) => {
                            //console.log(value)
                            // if one of the cell values corresponds to the filter item
                            return value.some(({cellValue}: any) => cellValue === filterItem.value);
                        };
                    },
                    InputComponent: CustomFilterInputSingleSelect
                }
            ]
        }
    ];
    //
    // @ts-ignore
    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }

        if (updatedRow.isNew) {

            await addRoomMutation.mutateAsync({
                id: id,
                name: updatedRow.name,
                surface: updatedRow.surface,
                thingsId: updatedRow.thingsId
            });
        }else{
            await updateRoomMutation.mutateAsync({
                id: id,
                name: updatedRow.name,
                surface: updatedRow.surface,
                thingsId: updatedRow.thingsId
            });
        }
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
                    rows={roomsQuery.data}
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
