import {useNavigate} from 'react-router-dom';
import LoginForm from "@/features/authentification/components/LoginForm";


export const Login = () => {
    const navigate = useNavigate();

    return (
        <LoginForm onSuccess={() => navigate('/')}/>
    );
};
