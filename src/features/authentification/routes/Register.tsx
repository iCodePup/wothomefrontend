import {useNavigate} from 'react-router-dom';
import RegisterForm from "@/features/authentification/components/RegisterForm";


export const Register = () => {
    const navigate = useNavigate();

    return (
        <RegisterForm onSuccess={() => navigate('/')}/>
    );
};
