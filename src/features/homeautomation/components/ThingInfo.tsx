import * as React from 'react';
import {Badge, Box, CircularProgress, Modal, Tooltip, Typography} from "@mui/material";
import {Thing} from "@/features/discoverthings/types";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import {useThingInfo} from "@/features/homeautomation/api/getThingInfo";
import {useThingProperties} from "@/features/homeautomation/api/getThingProperties";
import {DeviceThermostat, Lightbulb, ThermostatAuto, ToggleOn, Vibration} from "@mui/icons-material";
import TextField from "@mui/material/TextField";


export function ThingInfo({thing, index}: { thing: Thing; index: number }) {

    // @ts-ignore
    const thingInfo = useThingInfo(thing.url);
    const thingProperties = useThingProperties(thing.url);

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

    const getDeviceIcon = () => {
        // @ts-ignore
        if (thingInfo.data.data) {
            // @ts-ignore
            const type = thingInfo.data.data["@type"];
            switch (type[0]) {
                case 'Light':
                    return <Lightbulb onClick={handleOpen(thing)}/>;
                case 'OnOffSwitch':
                    return <ToggleOn onClick={handleOpen(thing)}/>;
                case 'Thermostat':
                    return <ThermostatAuto onClick={handleOpen(thing)}/>;
                case 'TemperatureSensor':
                    return <DeviceThermostat onClick={handleOpen(thing)}/>;
                case 'MotionSensor':
                    return <Vibration onClick={handleOpen(thing)}/>;
                default:
                    return <DeviceUnknownIcon onClick={handleOpen(thing)}/>;
            }
        }

        return <DeviceUnknownIcon onClick={handleOpen(thing)}/>;
    };

    const getBadgeContent = () => {
        // @ts-ignore
        if (thingProperties.data) {
            // @ts-ignore
            const keys: string[] = Object.keys(thingProperties.data.data);
            // @ts-ignore
            const values: string[] = Object.values(thingProperties.data.data);
            const divElements = values.map((value: string, index: number) => {
                // @ts-ignore
                return <Tooltip title={keys[index].replace("Property", "").replace(/([A-Z])/g, " $1").trim()}>
                    <div style={{fontSize: "10px"}} key={index}>{value}</div>
                </Tooltip>;
            });
            return <div>{divElements}</div>;
        }
        return "?"
    }

    const getModalForm = () => {
        // @ts-ignore
        if (thingProperties.data) {
            // @ts-ignore
            const keys: string[] = Object.keys(thingProperties.data.data);
            // @ts-ignore
            const values: string[] = Object.values(thingProperties.data.data);
            const form = values.map((value: string, index: number) => {
                // @ts-ignore
                let name = keys[index].replace("Property", "").replace(/([A-Z])/g, " $1").trim();
                // @ts-ignore
                return <Box component="form" //onSubmit={handleSubmit}
                            sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required={true}
                        fullWidth
                        id={keys[index]}
                        label={name}
                        name={name}
                        autoFocus
                        value={value}
                    />
                </Box>
            });
            return <div>{form}</div>;
        }
        return "?"
    }

    return (
        <div key={index} style={{marginRight: '15px', marginTop: '10px', position: 'relative'}}>
            <Tooltip title={thing.name}>
                <Badge badgeContent={getBadgeContent()} color="secondary">
                    {getDeviceIcon()}
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
                    {getModalForm()}
                </Box>
            </Modal>
        </div>)
}
