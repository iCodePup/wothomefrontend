import React from 'react';
import House from "@/features/homeautomation/components/House";
import {CircularProgress} from "@mui/material";
import {useRooms} from "@/features/homeautomation/api/getRooms";




// const rooms = [
//     {
//         name: 'Living Room',
//         surface: 40,
//         things: [
//             { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
//             { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
//         ],
//     },
//     {
//         name: 'Cuisine',
//         surface: 12,
//         things: [
//             { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
//             { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
//         ],
//     },
//     {
//         name: 'Sdb',
//         surface: 6,
//         things: [
//             { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
//             { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
//         ],
//     },
// ];

const HomeAutomation: React.FC = () => {

    const roomsQuery = useRooms();

    if (roomsQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!roomsQuery.data) return null;

    const rooms = roomsQuery.data

    return (
        <div>
            <House rooms={rooms} />
        </div>
    );
};

export default HomeAutomation;
