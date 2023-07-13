import {Route, Routes} from 'react-router-dom';
import {DashboardAdmin} from "@/features/admindashboard/routes/DashboardAdmin";



export const AdminDashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardAdmin/>}/>
        </Routes>
    );
};
