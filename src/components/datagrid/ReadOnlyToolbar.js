import * as React from "react";
import {
    GridCsvExportMenuItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";

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