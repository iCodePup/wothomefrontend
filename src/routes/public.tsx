import {AuthRoutes} from "@/features/authentification";


export const publicRoutes = [
  {
    path: '/*',
    element: <AuthRoutes />,
  },
];
