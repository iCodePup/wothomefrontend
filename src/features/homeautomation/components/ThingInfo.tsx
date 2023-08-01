import * as React from 'react';
import {Badge, Box, CircularProgress, Modal, Tooltip, Typography} from "@mui/material";
import {Thing} from "@/features/discoverthings/types";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import {useThingInfo} from "@/features/homeautomation/api/getThingInfo";


export function ThingInfo({thing, index}: { thing: Thing; index: number }) {

    const thingInfo = useThingInfo(thing.url);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (thing: Thing) => () => {
        //faireune requete vers l'url..
        if (thing.alive) {
            //thing.url
            //recuperer la liste des propriétés et la rnager dansun objet properties quisera affiché dansla modal
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    if (thingInfo.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingInfo.data) return null;


    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (<div key={index} style={{marginRight: '2px',marginTop: '5px', position: 'relative'}}>
        <Tooltip title={thing.name}>
            <Badge badgeContent={"On"} color="secondary">
                <DeviceUnknownIcon onClick={handleOpen(thing)}/>
            </Badge>
        </Tooltip>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {thing.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {thing.description}
                </Typography>
            </Box>
        </Modal>
    </div>)
}
