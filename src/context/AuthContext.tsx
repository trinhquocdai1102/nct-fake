import React, { useState, FC } from 'react';

export interface User {
    name: string;
    username: string;
    password: string;
    memberType: 'normal' | 'admin' | 'V.I.P';
}

export interface Register {
    email: string;
    password: string;
    rePassword: string;
}

interface PlayerContextState {
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
}

export const AuthContext = React.createContext<PlayerContextState>({
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
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User[]>([]);
    const [registerUser, setRegisterUser] = useState<Register[]>([]);
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);
    const [loading, setLoading] = useState(false);

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
    };

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};
