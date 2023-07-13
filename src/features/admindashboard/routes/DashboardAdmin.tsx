import {useNavigate} from 'react-router-dom';
import DashboardAdminComponent from "@/features/admindashboard/components/DashboardAdminComponent";


export const DashboardAdmin = () => {
    const navigate = useNavigate();

    return (
        <DashboardAdminComponent onLogout={() => navigate('/')}/>
    );
};
