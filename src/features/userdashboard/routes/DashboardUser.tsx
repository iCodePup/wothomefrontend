import {useNavigate} from 'react-router-dom';
import DashboardUserComponent from "@/features/userdashboard/components/DashboardUserComponent";


export const DashboardUser = () => {
    const navigate = useNavigate();

    return (
        <DashboardUserComponent onLogout={() => navigate('/')}/>
    );
};
