import React from 'react';
import ProtectedRoute from '../components/Route/ProtectedRoute';
import ProfileDetail from '../pages/Detail/ProfileDetail';

export const ProtectedRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/user/profile/:key',
                element: <ProfileDetail />,
            },
        ],
    },
];
