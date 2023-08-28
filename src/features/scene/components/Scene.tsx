import React, {useState, useEffect} from 'react';
import {useUserThing} from "@/features/userthings/api/getUserThings";
import {SceneForm} from "@/features/scene/components/SceneForm";
import {CircularProgress} from "@mui/material";
import {Thing} from "@/features/discoverthings/types";
import {getThingProperties} from "@/features/homeautomation/api/getThingProperties";

const Scene: React.FC = () => {
    const things = useUserThing();
    const [thingsWithProperties, setThingsWithProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            // @ts-ignore
            const promises = things.data.map(async (thing: Thing) => {
                const thingProps = await getThingProperties(thing.url);
                // @ts-ignore
                let properties: any[] = []
                if (thingProps) {
                    // @ts-ignore
                    if (thingProps.data) {
                        // @ts-ignore
                        properties = Object.keys(thingProps.data);
                    }
                }
                return {
                    thing,
                    properties,
                };
            });
            const results = await Promise.all(promises);
            // @ts-ignore
            setThingsWithProperties(results);
        };
        if (things.data) {
            fetchProperties();
        }
    }, [things.data]);

    if (things.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!things.data) return null;

    if (!thingsWithProperties) return null;
    if (thingsWithProperties.length == 0) return null;

    return (
        <div className="App">
            <SceneForm things={things} thingsWithProperties={thingsWithProperties}/>
        </div>
    );
};

export default Scene;
