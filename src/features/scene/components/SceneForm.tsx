import React, {useEffect, useState} from 'react';
import ExpressionComponent from './ExpressionComponent';
import {useAddRule} from "@/features/scene/api/addRule";
import {Button} from '@mui/material';

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


export function SceneForm({things, thingsWithProperties}: { things: any, thingsWithProperties: any }) {

    const addRule = useAddRule();

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

        if (name === 'name') {
            setFormValues((prevValues) => ({
                ...prevValues,
                name: value,
            }));
        } else {
            const [parentField, childField] = name.split('.');


            setFormValues((prevValues) => ({
                ...prevValues,
                [parentField]: {
                    // @ts-ignore
                    ...prevValues[parentField],
                    [childField]: value,
                },
            }));
        }
    };

    const transformJsonForm = (obj: any) => {
        const transformedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === "thingId") {
                    // @ts-ignore
                    transformedObj.thingDTO = {id: obj[key]};
                } else if (typeof obj[key] === "object") {
                    // @ts-ignore
                    transformedObj[key] = transformJsonForm(obj[key]);
                } else {
                    // @ts-ignore
                    transformedObj[key] = obj[key];
                }
            }
        }
        return transformedObj;
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const json: {} = transformJsonForm(formValues)
        console.log(json);
        addRule.mutateAsync(json)
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
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>
                    Nom: &nbsp;
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                </label>
            </p>
            <p>
                <b>Si (Règle):</b>&nbsp;
                <ExpressionComponent
                    thingsWithProperties={thingsWithProperties}
                    expression={formValues.triggerExpressionDTO}
                    onChange={handleTriggerExpressionChange}
                />
            </p>
            <p>
                <b>Alors (action):</b>&nbsp;
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
                    Propriété de l'objet:&nbsp;
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
                    Valeur:&nbsp;
                    <input
                        type="text"
                        name="actionDTO.value"
                        value={formValues.actionDTO.value}
                        onChange={handleInputChange}
                    />
                </label>
            </p>
            <p>

                <Button type="submit">Ajouter la règle</Button>
            </p>
        </form>
    );
};









