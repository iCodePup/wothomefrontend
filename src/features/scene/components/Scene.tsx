import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

type ASTNode = {
    type: 'AND' | 'OR';
    children: (ASTNode | Item)[];
};

type Property = {
    name: string;
    value: string;
};

type Item = {
    name: string;
    properties: Property[];
};

const AvailableItems: Item[] = [
    {
        name: 'Item 1',
        properties: [
            {name: 'Property 1', value: ''},
            {name: 'Property 2', value: ''},
        ],
    },
    {
        name: 'Item 2',
        properties: [
            {name: 'Property 1', value: ''},
            {name: 'Property 2', value: ''},
        ],
    },
    // Add more items as needed
];

const PropertySelector: React.FC<{
    properties: Property[];
    onSelect: (property: Property) => void;
}> = ({properties, onSelect}) => {
    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedPropertyName = event.target.value as string;
        const selectedProperty = properties.find(property => property.name === selectedPropertyName) || null;
        if (selectedProperty) {
            onSelect(selectedProperty);
        }
    };


    return (
        <FormControl>
            <InputLabel>Select Property</InputLabel>
            // @ts-ignore
            <Select onChange={handleSelect} value="">
                {properties.map((property) => (
                    <MenuItem key={property.name} value={property.name}>
                        {property.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const ItemSelector: React.FC<{
    onSelect: (item: Item) => void;
}> = ({onSelect}) => {
    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedItemName = event.target.value as string;
        const selectedItem = AvailableItems.find(item => item.name === selectedItemName) || null;
        if (selectedItem) {
            onSelect(selectedItem);
        }
    };

    return (
        <FormControl>
            <InputLabel>Select Item</InputLabel>
            <Select onChange={handleSelect} value="">
                {AvailableItems.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const ASTNodeComponent: React.FC<{ node: ASTNode }> = ({node}) => {
    const [showOperatorDialog, setShowOperatorDialog] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState<'AND' | 'OR'>('AND');
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleOpenOperatorDialog = () => {
        setShowOperatorDialog(true);
    };

    const handleCloseOperatorDialog = () => {
        setShowOperatorDialog(false);
    };

    const handleOperatorSelect = (operator: 'AND' | 'OR') => {
        setSelectedOperator(operator);
        setShowOperatorDialog(false);
    };

    const handleItemSelect = (item: Item) => {
        setSelectedItem(item);
        setSelectedProperty(null);
        setSelectedValue('');
    };

    const handlePropertySelect = (property: Property) => {
        setSelectedProperty(property);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleAddItem = () => {
        if (selectedItem && selectedProperty && selectedValue) {
            const newItem: Item = {
                ...selectedItem,
                properties: selectedItem.properties.map(prop =>
                    prop === selectedProperty
                        ? {...prop, value: selectedValue}
                        : prop
                ),
            };
            node.children.push(newItem);
            node.children.push(selectedOperator);
            setSelectedItem(null);
            setSelectedProperty(null);
            setSelectedValue('');
        }
    };

    return (
        <div>
            {node.children.map((child, index) => (
                <div key={index}>
                    {child instanceof Object && 'type' in child ? (
                        <ASTNodeComponent node={child}/>
                    ) : child instanceof Object && 'properties' in child ? (
                        <p>
                            Name: {child.name},
                            Properties: {child.properties.map(prop => `${prop.name}: ${prop.value}`).join(', ')}
                        </p>
                    ) : (
                        <p>{child}</p>
                    )}
                </div>
            ))}
            {selectedOperator && (
                <div>
                    <ItemSelector onSelect={handleItemSelect}/>
                    {selectedItem && (
                        <>
                            <PropertySelector
                                properties={selectedItem.properties}
                                onSelect={handlePropertySelect}
                            />
                            <TextField
                                label="Value"
                                value={selectedProperty?.value || ''}
                                onChange={handleValueChange}
                            />
                            <Button onClick={handleAddItem}>Add Item</Button>
                        </>
                    )}
                    <Button onClick={handleOpenOperatorDialog}>Change Operator</Button>
                </div>
            )}
            <Dialog open={showOperatorDialog} onClose={handleCloseOperatorDialog}>
                <DialogTitle>Select Operator</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel>Operator</InputLabel>
                        <Select onChange={(e) => handleOperatorSelect(e.target.value as 'AND' | 'OR')}>
                            <MenuItem value="AND">AND</MenuItem>
                            <MenuItem value="OR">OR</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOperatorDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const App: React.FC = () => {
    const initialAST: ASTNode = {
        type: 'AND',
        children: [],
    };

    return (
        <div>
            <h1>Scene domotique:</h1>
            <ASTNodeComponent node={initialAST}/>
        </div>
    );
};

export default App;
