export interface Room {
    name: string;
    surface: number;
    things: Thing[];
}

export interface Thing {
    name: string;
    icon: string; // URL to the Mui icon image
}