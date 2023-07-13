import * as React from "react";
import {
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    // GridPrintExportMenuItem,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function ReadOnlyToolbar(props) {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem/>
            </GridToolbarExportContainer>
            <GridToolbarQuickFilter/>
        </GridToolbarContainer>
    );
}

ReadOnlyToolbar.defaultProps = {}

export default ReadOnlyToolbar;