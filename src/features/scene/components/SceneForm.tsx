import React, {useEffect, useState} from 'react';
import ExpressionComponent from './ExpressionComponent';
import {useThingProperties} from "@/features/homeautomation/api/getThingProperties";
import {Thing} from "@/features/discoverthings/types";

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


export function ListThingsProperties(url: string | undefined) {
    const thingProps: any = useThingProperties(url);
    if (thingProps) {
        if (thingProps.data) {
            if (thingProps.data.data) {
                return Object.keys(thingProps.data.data);
            }
        }
    }
    return [];
}


export function SceneForm({things}: { things: any }) {

    const thingsWithProperties = things.data.map((thing: Thing) => {
        return {
            thing,
            properties: ListThingsProperties(thing.url)
        }
    });

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        actionDTO: {
            thingId: thingsWithProperties.length > 0 ? thingsWithProperties[0].thing.id : 1,
            property: '',
            value: ''
        },
        triggerExpressionDTO: {
            type: 'thing',
            thingId: thingsWithProperties.length > 0 ? thingsWithProperties[0].thing.id : 1,
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
        };

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

    useEffect(() => {
        // @ts-ignore
        const selectedThing = thingsWithProperties.find(item => item.thing.id == formValues.actionDTO.thingId);
        if (selectedThing) {
            setFormValues((prevValues) => ({
                ...prevValues,
                actionDTO: {
                    ...prevValues.actionDTO,
                    property: selectedThing.properties[0] || '',
                },
            }));
        }
    }, [formValues.actionDTO.thingId]);

    // @ts-ignore
    // @ts-ignore
    return (
        <form onSubmit={handleSubmit}>
            <p>
                Si (Règle) :
                <ExpressionComponent
                    thingsWithProperties={thingsWithProperties}
                    expression={formValues.triggerExpressionDTO}
                    onChange={handleTriggerExpressionChange}
                />
            </p>
            <p>
                Alors (action) :
                <br/>
                <label>
                    Objet connecté:
                    <select
                        name="actionDTO.thingId"
                        value={formValues.actionDTO.thingId}
                        onChange={handleInputChange}
                    >
                        {thingsWithProperties.map((item: any) => (
                            <option key={item.thing.id} value={item.thing.id}>
                                {item.thing.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Propriété de l'objet:
                    <select
                        name="actionDTO.property"
                        value={formValues.actionDTO.property}
                        onChange={handleInputChange}
                    >
                        {

                            thingsWithProperties
                                .find((item: { thing: { id: number; }; }) => {
                                    return item.thing.id == formValues.actionDTO.thingId
                                })
                                ?.properties.map((property: string) => {
                                return (<option key={property} value={property}>
                                    {property}
                                </option>)
                            })


                        }
                    </select>
                </label>
                <br/>
                <label>
                    Valeur:
                    <input
                        type="text"
                        name="actionDTO.value"
                        value={formValues.actionDTO.value}
                        onChange={handleInputChange}
                    />
                </label>
            </p>
            <p>

                <button type="submit">Generate JSON</button>
            </p>
        </form>
    );
};









