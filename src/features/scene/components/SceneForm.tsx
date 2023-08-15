import React, {useEffect, useState} from 'react';
import ExpressionComponent from './ExpressionComponent';
import {useThingInfo} from "@/features/homeautomation/api/getThingInfo";
import {useThingProperties} from "@/features/homeautomation/api/getThingProperties";
import {useUserThing} from "@/features/userthings/api/getUserThings";
import {CircularProgress} from "@mui/material";
import {Thing} from "@/features/discoverthings/types";
import {ThingInfo, ThingProperties} from "@/features/homeautomation/types";


interface Action {
    thingId: number;
    property: string;
    value: string;
}

interface FormValues {
    name: string;
    actionDTO: Action;
    triggerExpressionDTO: any;
}


export function SceneForm({things}: { things: any }) {

    const [mappedThings, setMappedThings] = useState<Array<{ thingInfo: any, thingProperties: any }>>([]);

    // useEffect(() => {
    //     // Fetch and build mappedThings using the things array
    //     // @ts-ignore
    //     const updatedMappedThings = things.data.map((thing: Thing) => {
    //         const thingInfo = useThingInfo(thing.url);
    //         const thingProperties = useThingProperties(thing.url);
    //         return {
    //             thing,
    //             thingInfo,
    //             thingProperties,
    //         };
    //     });
    //
    //     setMappedThings(updatedMappedThings);
    // }, [things]);


    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        actionDTO: {
            thingId: 1,
            property: '',
            value: ''
        },
        triggerExpressionDTO: {
            type: 'thing',
            thingId: 1,
            property: '',
            value: ''

        }
    });


    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = event.target;

        // Map the input element names to the corresponding keys in the state
        const mapping: { [key: string]: string } = {
            'actionDTO.thingId': 'thingId',
            'actionDTO.property': 'property',
            'actionDTO.value': 'value',
            // Add more mappings if needed
        };

        // Get the corresponding key from the mapping
        const stateKey = mapping[name];

        setFormValues((prevValues) => ({
            ...prevValues,
            actionDTO: {
                ...prevValues.actionDTO,
                [stateKey]: value,
            },
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Construct the final JSON object using formValues
        const jsonStructure = JSON.stringify(formValues, null, 2);
        console.log(jsonStructure);
    };

    const handleTriggerExpressionChange = (
        updatedExpression: any
    ) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            triggerExpressionDTO: updatedExpression,
        }));
    };


    // Define your form inputs here
    // @ts-ignore
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Action Thing ID:
                <input
                    type="number"
                    name="actionDTO.thingId"
                    value={formValues.actionDTO.thingId}
                    onChange={handleInputChange}
                />
            </label>
            <br/>
            <label>
                Action Property:
                <input
                    type="text"
                    name="actionDTO.property"
                    value={formValues.actionDTO.property}
                    onChange={handleInputChange}
                />
            </label>
            <br/>
            <label>
                Action Value:
                <input
                    type="text"
                    name="actionDTO.value"
                    value={formValues.actionDTO.value}
                    onChange={handleInputChange}
                />
            </label>


            <p>
                Règle :
                <ExpressionComponent
                    expression={formValues.triggerExpressionDTO}
                    onChange={handleTriggerExpressionChange}
                />
                <button type="submit">Generate JSON</button>
            </p>
        </form>
    );
};









