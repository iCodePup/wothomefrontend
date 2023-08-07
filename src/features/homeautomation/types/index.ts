import {Thing} from "@/features/discoverthings/types";

export type Room = {
    id: number;
    name: string;
    surface: number;
    things: Thing[];
};

export type ThingInfo = {
    id: number;
    title: string;
    type: [];
    properties: ThingProperties;
};

export type ValueType = number | boolean | string;


export type ThingProperties = {};


// {
//     "security": "nosec_sc",
//     "@type": [
//     "Light"
// ],
//     "description": "aaa",
//     "links": [
//     {
//         "rel": "properties",
//         "href": "/properties"
//     },
//     {
//         "rel": "actions",
//         "href": "/actions"
//     },
//     {
//         "rel": "events",
//         "href": "/events"
//     },
//     {
//         "rel": "alternate",
//         "href": "ws://192.168.1.33:8889/"
//     }
// ],
//     "id": "0",
//     "title": "ma lampecoucou",
//     "@context": "https://iot.mozilla.org/schemas",
//     "actions": {},
//     "securityDefinitions": {
//     "nosec_sc": {
//         "scheme": "nosec"
//     }
// },
//     "properties": {
//     "OnOffProperty": {
//         "unit": "boolean",
//             "@type": "OnOffProperty",
//             "description": "The current status (on/off)",
//             "readOnly": false,
//             "links": [
//             {
//                 "rel": "property",
//                 "href": "/properties/OnOffProperty"
//             }
//         ],
//             "title": "OnOff",
//             "type": "boolean"
//     }
// },
//     "events": {},
//     "base": "http://192.168.1.33:8889/"
// }