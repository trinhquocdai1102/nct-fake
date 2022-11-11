import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Error from '../Common/Error';

const ProtectedRoute = () => {
    const { isLogged, logged, setOpenFormLogin } = useContext(AuthContext);

    return (
        <>
            {isLogged && isLogged !== undefined && logged ? (
                <Outlet />
            ) : (
                <Error
                    title='Vui lòng đăng nhập'
                    handler={() => setOpenFormLogin(true)}
                />
            )}
        </>
    );
};

export default ProtectedRoute;
