import * as React from "react";
import {
    GridCsvExportMenuItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Scene from "@/features/scene/components/Scene";

function SceneToolbar(props) {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClick = () => {
        setOpen(true);
        //return ();

        // const newData = createRowData(rows);
        // newData.isNew = true;
        // if (!newData.hasOwnProperty("id"))
        //     newData.newId = Math.max(...rows.map((r) => r.id * 1)) + 1;
        // setRows((oldRows) => {
        //     return [...oldRows, newData]
        // });
        // setRowModesModel((oldModel) => {
        //     const firstEditable = columns.find(c => c.editable && !c.hide);
        //     return {
        //         ...oldModel,
        //         [newData.id]: {mode: GridRowModes.Edit, fieldToFocus: firstEditable.field}
        //     }
        // });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Scene/>
                </Box>
            </Modal>
            <GridToolbarContainer>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarExportContainer>
                    <GridCsvExportMenuItem/>
                </GridToolbarExportContainer>
                <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                    Ajouter une nouvelle scene
                </Button>
                <GridToolbarQuickFilter/>
            </GridToolbarContainer>
        </div>
    );
}

SceneToolbar.defaultProps = {}

export default SceneToolbar;