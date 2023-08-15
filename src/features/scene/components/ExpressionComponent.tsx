import React from "react";

interface ExpressionOrOperator {
    type: "thing" | "and" | "or";
    thingId?: number;
    property?: string;
    value?: string;
    firstExpression?: ExpressionOrOperator;
    secondExpression?: ExpressionOrOperator;
}

interface ExpressionProps {
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

    }  else {
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
                thingId: undefined,
                property: "",
                value: "",
            };
        } else {
            return {
                type: selectedType,
                thingId: 0,
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
                thingId: 0,
                property: "",
                value: "",
            },
            secondExpression: {
                type: "thing",
                thingId: 0,
                property: "",
                value: "",
            },
        };
    }
};

const ExpressionComponent: React.FC<ExpressionProps> = ({expression, onChange}) => {
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
                        Thing ID:
                        <input
                            type="number"
                            value={expression.thingId || ''}
                            onChange={(e) =>
                                onChange({
                                    ...expression,
                                    thingId: parseInt(e.target.value, 10),
                                })
                            }
                        />
                    </label>
                    <label>
                        Property:
                        <input
                            type="text"
                            value={expression.property || ''}
                            onChange={(e) =>
                                onChange({
                                    ...expression,
                                    property: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        Value:
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
                            expression={expression.firstExpression as ExpressionOrOperator}
                            onChange={(updatedExpression) =>
                                onChange(updateExpression(expression, updatedExpression, true))
                            }
                        />
                        <ExpressionComponent
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
