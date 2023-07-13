export type ThingType = {
    key: string;
    value: string;
    label: string;
};


export type ThingInStore = {
    id: number;
    thingId: string;
    name: string;
    description: string;
    prix: number;
    client: string | undefined;
};
