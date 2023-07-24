import {UserDashboardRoutes} from "@/features/userdashboard";

export const protectedUserRoutes = [
    {
        path: '/*',
        element: <UserDashboardRoutes/>,
    },
];


