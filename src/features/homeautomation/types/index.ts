import {Thing} from "@/features/discoverthings/types";

export type Room = {
    id: number;
    name: string;
    surface: number;
    things: Thing[];
};
