import {useNavigate} from 'react-router-dom';
import DashboardClientComponent from "@/features/clientdashboard/components/DashboardClientComponent";


export const DashboardClient = () => {
    const navigate = useNavigate();

    return (
        <DashboardClientComponent onLogout={() => navigate('/')}/>
    );
};
