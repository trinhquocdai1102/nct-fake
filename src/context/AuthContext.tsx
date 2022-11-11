import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';

export interface User {
    name: string;
    email: string;
    username: string;
    password: string;
    id: string;
    memberType: 'normal' | 'admin' | 'V.I.P';
}

export interface Register {
    email: string;
    name: string;
    password: string;
    rePassword: string;
    id: string;
}

interface AuthContextState {
    currentUser: User[];
    setCurrentUser: Function;
    registerUser: Register[];
    setRegisterUser: Function;
    openFormLogin: boolean;
    setOpenFormLogin: Function;
    openFormRegister: boolean;
    setOpenFormRegister: Function;
    loading: boolean;
    setLoading: Function;
    logged: any;
    setLogged: Function;
    isLogged: any;
}

export const AuthContext = React.createContext<AuthContextState>({
    currentUser: [],
    setCurrentUser: () => {},
    registerUser: [],
    setRegisterUser: () => {},
    openFormLogin: false,
    setOpenFormLogin: () => {},
    openFormRegister: false,
    setOpenFormRegister: () => {},
    loading: false,
    setLoading: () => {},
    logged: {},
    setLogged: () => {},
    isLogged: {},
});

export const AuthContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [logged, setLogged] = useState<any>();
    const [currentUser, setCurrentUser] = useState<User[]>([]);
    const [registerUser, setRegisterUser] = useState<Register[]>([]);
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const allUser = useSelector((state: any) => state.auth);
    const isLogged =
        allUser &&
        allUser?.find(
            (item: any) =>
                item?.email === logged?.email && item?.email !== undefined
        );

    const AuthContextData = {
        currentUser,
        setCurrentUser,
        registerUser,
        setRegisterUser,
        openFormLogin,
        setOpenFormLogin,
        openFormRegister,
        setOpenFormRegister,
        loading,
        setLoading,
        logged,
        setLogged,
        isLogged,
    };

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};
