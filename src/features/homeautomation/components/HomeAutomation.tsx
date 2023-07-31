// App.tsx

import React from 'react';
import House from "@/features/homeautomation/components/House";

const rooms = [
    {
        name: 'Living Room',
        surface: 40,
        things: [
            { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
            { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
        ],
    },
    {
        name: 'Cuisine',
        surface: 12,
        things: [
            { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
            { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
        ],
    },
    {
        name: 'Sdb',
        surface: 6,
        things: [
            { name: 'Sofa', icon: 'https://url-to-your-mui-icon-image' },
            { name: 'TV', icon: 'https://url-to-your-mui-icon-image' },
        ],
    },
];

const HomeAutomation: React.FC = () => {
    return (
        <div>
            <House rooms={rooms} />
        </div>
    );
};

export default HomeAutomation;
