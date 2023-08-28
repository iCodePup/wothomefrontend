import React, {useEffect} from "react";

interface ExpressionOrOperator {
    type: "thing" | "and" | "or";
    thingId?: number;
    property?: string;
    value?: string;
    firstExpression?: ExpressionOrOperator;
    secondExpression?: ExpressionOrOperator;
}

interface ExpressionProps {
    thingsWithProperties: any
    expression: ExpressionOrOperator;
    onChange: (updatedExpression: ExpressionOrOperator) => void;
}

const updateExpression = (
    targetExpression: ExpressionOrOperator,
    updatedExpression: ExpressionOrOperator,
    isFirstExpression: boolean
): ExpressionOrOperator => {
    if (targetExpression === updatedExpression) {
        if (isFirstExpression) {
            return {
                ...updatedExpression,
                secondExpression: targetExpression.secondExpression,
            };
        } else {
            return {
                ...targetExpression,
                secondExpression: updatedExpression,
            };
        }
    } else if (isFirstExpression && targetExpression.firstExpression) {
        var foo = {
            ...targetExpression,
            firstExpression: updateExpression(
                targetExpression.firstExpression,
                updatedExpression,
                isFirstExpression
            ),
        };
        return foo;
    } else if (targetExpression.secondExpression) {
        return {
            ...targetExpression,
            secondExpression: updateExpression(
                targetExpression.secondExpression,
                updatedExpression,
                false
            ),
        };
    } else if (
        updatedExpression.type === "thing"
    ) {
        return updatedExpression

    } else {
        return targetExpression;
    }
};


const handleOperatorChange = (
    expression: ExpressionOrOperator,
    selectedType: "and" | "or" | "thing"
): ExpressionOrOperator => {
    if (selectedType === "thing") {
        if (expression.type === "thing") {
            return {
                ...expression,
                thingId: expression.thingId,
                property: "",
                value: "",
            };
        } else {
            return {
                type: selectedType,
                thingId: expression.thingId,
                property: "",
                value: "",
            };
        }
    } else {
        return {
            ...expression,
            type: selectedType,
            firstExpression: {
                type: "thing",
                thingId: expression.thingId,
                property: "",
                value: "",
            },
            secondExpression: {
                type: "thing",
                thingId: expression.thingId,
                property: "",
                value: "",
            },
        };
    }
};

const ExpressionComponent: React.FC<ExpressionProps> = ({thingsWithProperties, expression, onChange}) => {

    useEffect(() => {

        console.log("thingsWithProperties")
        console.log(thingsWithProperties)
        console.log("expression")
        console.log(expression)
        // @ts-ignore
        const selectedThing = thingsWithProperties.find(item => item.thing.id == expression.thingId);
        console.log("selectedThing")
        console.log(selectedThing)
        if (selectedThing) {
            expression.property = selectedThing.properties[0] || ''
        }
    }, [expression.thingId]);


    return (
        <div>
            {expression && (
                <select
                    value={expression.type}
                    onChange={(e) => {
                        const selectedType = e.target.value as "thing" | "and" | "or";
                        onChange(handleOperatorChange(expression, selectedType));
                    }}
                >
                    <option value="and">AND</option>
                    <option value="or">OR</option>
                    <option value="thing">Thing</option>
                </select>
            )}
            {expression?.type === "thing" ? (
                <div>
                    <label>
                        &nbsp;Objet connecté:
                        <select
                            value={expression.thingId || ''}
                            onChange={(e) =>
                                onChange({
                                    ...expression,
                                    thingId: parseInt(e.target.value, 10),
                                })
                            }
                        >
                            {thingsWithProperties.map((item: any) => (
                                <option key={item.thing.id} value={item.thing.id}>
                                    {item.thing.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        &nbsp;Propriété de l'objet:
                        <select
                            name="actionDTO.property"
                            value={expression.property || ''}
                            onChange={(e) =>
                                onChange({
                                    ...expression,
                                    property: e.target.value,
                                })
                            }
                        >
                            {
                                thingsWithProperties
                                    .find((item: { thing: { id: number; }; }) => {
                                        return item.thing.id == expression.thingId
                                    })
                                    ?.properties.map((property: string) => {
                                    return (<option key={property} value={property}>
                                        {property}
                                    </option>)
                                })
                            }
                        </select>
                    </label>
                    <label>
                        &nbsp;Valeur:
                        <input
                            type="text"
                            value={expression.value || ''}
                            onChange={(e) =>
                                onChange({
                                    ...expression,
                                    value: e.target.value,
                                })
                            }
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <div>
                        <ExpressionComponent
                            thingsWithProperties={thingsWithProperties}
                            expression={expression.firstExpression as ExpressionOrOperator}
                            onChange={(updatedExpression) =>
                                onChange(updateExpression(expression, updatedExpression, true))
                            }
                        />
                        <ExpressionComponent
                            thingsWithProperties={thingsWithProperties}
                            expression={expression.secondExpression as ExpressionOrOperator}
                            onChange={(updatedExpression) =>
                                onChange(updateExpression(expression, updatedExpression, false))
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpressionComponent;
