import {Route, Routes} from 'react-router-dom';
import {DashboardClient} from "@/features/clientdashboard/routes/DashboardClient";



export const ClientDashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardClient/>}/>
        </Routes>
    );
};
