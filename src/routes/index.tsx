import {useRoutes} from 'react-router-dom';
import {AuthRoutes} from "@/features/authentification";
import {useUser} from '@/lib/auth';
import {publicRoutes} from "@/routes/public";
import {protectedAdminRoutes} from "@/routes/protectedadmin";
import {protectedClientRoutes} from "@/routes/protectedclient";

export const AppRoutes = () => {
    const auth = useUser();

    const commonRoutes = [{path: '/*', element: <AuthRoutes/>}];


    const routes =
        auth.data ? auth.data?.role === 'ADMIN' ? protectedAdminRoutes : protectedClientRoutes : publicRoutes
    //const routes = auth.data ? protectedAdminRoutes : publicRoutes

    const element = useRoutes([...routes, ...commonRoutes]);

    // const commonRoutes = [{ path: '/*', element: <AuthRoutes /> }];
    // const element = useRoutes([ ...commonRoutes]);

    return <>{element}</>;
};
