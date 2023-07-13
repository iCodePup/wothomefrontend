
import {ClientDashboardRoutes} from "@/features/clientdashboard";

export const protectedClientRoutes = [
    {
        path: '/*',
        element: <ClientDashboardRoutes/>,
    },
];


