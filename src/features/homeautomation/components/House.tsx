import React from 'react';
import {Box, Typography} from '@mui/material';
import {Room, Thing} from "@/features/homeautomation/types";

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


const House: React.FC<HouseProps> = ({ rooms }) => {
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
                        const { width, height } = getProportionalDimensions(room.surface);

                        return (
                            <div key={index} style={{ margin: '8px', width: `${width}px`, height: `${height}px` }}>
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
                                    <div style={{ display: 'flex', marginTop: '8px' }}>
                                        {room.things.map((thing, index) => (
                                            <div key={index} style={{ marginRight: '8px' }}>
                                                <img src={thing.icon} alt={thing.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default House;