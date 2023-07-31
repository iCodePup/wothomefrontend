import React from 'react';
import {Box, Modal, Tooltip, Typography} from '@mui/material';
import {Room} from "@/features/homeautomation/types";
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import {Thing} from "@/features/discoverthings/types";

interface HouseProps {
    rooms: Room[];
}

interface Dimensions {
    width: number;
    height: number;
}


const getProportionalDimensions = (surface: number): Dimensions => {
    const widthToHeightRatio = 3 / 2; // Hard-coded width-to-height ratio: 3:2
    const minWidth = 120; // Increased minimum width for the room
    const minHeight = 80; // Increased minimum height for the room

    const width = Math.sqrt(surface * widthToHeightRatio) * 6;
    const height = (width / widthToHeightRatio) * 6;

    return {
        width: width < minWidth ? minWidth : width,
        height: height < minHeight ? minHeight : height,
    };
};


const House: React.FC<HouseProps> = ({rooms}) => {
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

    const getIcon = (thing: Thing) => {

        return <DeviceUnknownIcon onClick={handleOpen(thing)}/>
    }

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

    return (
        <Box display="flex" flexDirection="column" alignItems="center" paddingTop="80px">
            <Box
                position="relative"
                width="1200px" /* Increased width for a larger house */
                height="450px" /* Increased height for a larger house */
                border="2px solid black"
                bgcolor="beige"
            >
                <Box display="flex" flexDirection="row" justifyContent="left" alignItems="left">
                    {rooms.map((room, index) => {
                        const {width, height} = getProportionalDimensions(room.surface);

                        return (
                            <div key={index} style={{margin: '8px', width: `${width}px`, height: `${height}px`}}>
                                <div
                                    style={{
                                        border: '1px solid black',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <Typography variant="body1" className="room-info">
                                        {room.name}
                                    </Typography>
                                    <Typography variant="body2" className="room-info">
                                        Surface: {room.surface} m²
                                    </Typography>
                                    <div style={{display: 'flex', marginTop: '2px'}}>
                                        {room.things ? room.things.map((thing, index) => (
                                            <div key={index} style={{marginRight: '2px', position: 'relative'}}>
                                                <Tooltip title={thing.name}>
                                                    {getIcon(thing)}
                                                </Tooltip>

                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
};

export default House;