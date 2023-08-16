import React from 'react';
import {useUserThing} from "@/features/userthings/api/getUserThings";
import {SceneForm} from "@/features/scene/components/SceneForm";
import {CircularProgress} from "@mui/material";


const Scene: React.FC = () => {

    const things = useUserThing();

    if (things.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!things.data) return null;

    return (
        <div className="App">
            <SceneForm things={things}/>
        </div>
    );
};

export default Scene;