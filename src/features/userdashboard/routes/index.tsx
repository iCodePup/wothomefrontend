import {Route, Routes} from 'react-router-dom';
import {DashboardUser} from "@/features/userdashboard/routes/DashboardUser";



export const UserDashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardUser/>}/>
        </Routes>
    );
};
