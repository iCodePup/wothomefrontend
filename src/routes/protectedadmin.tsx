
import {AdminDashboardRoutes} from "@/features/admindashboard";

export const protectedAdminRoutes = [
    {
        path: '/*',
        element: <AdminDashboardRoutes/>,
    },
];


