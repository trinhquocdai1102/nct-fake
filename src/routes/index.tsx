import { useRoutes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectRoutes';
import { PublicRoutes } from './PublicRoutes';

export const routeConfig = [
    {
        children: ProtectedRoutes,
    },
    {
        children: PublicRoutes,
    },
];

const RouterManager = () => {
    return useRoutes(routeConfig);
};

export default RouterManager;
