import React, { FC, useContext } from 'react';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Player from '../components/Player';
import Register from '../components/Register';
import Sidebar from '../components/Sidebar/Sidebar';
import { AuthContext } from '../context/AuthContext';
import useInnerWidth from '../hooks/useInnerWidth';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const sidebarWidth = 200;
    const playerWidth = 300;

    const { isLaptop, isTablet } = useInnerWidth();
    const { openFormLogin, openFormRegister } = useContext(AuthContext);
    return (
        <div className='bg-slate-50'>
            <div className='flex w-full overflow-auto'>
                <div
                    style={{
                        left: isTablet ? '0' : '-200px',
                        transition: 'all linear 0.3s',
                    }}
                    className='w-[200px] max-w-full z-[99] h-screen pt-5 border-r border-third-color fixed top-0 bottom-0 left-0'
                >
                    <Sidebar />
                </div>
                <div
                    className='relative'
                    style={{
                        width: isLaptop
                            ? `calc(100% - ${sidebarWidth + playerWidth}px)`
                            : isTablet
                            ? `calc(100% - ${sidebarWidth}px)`
                            : '100%',
                        marginLeft: isTablet ? `${sidebarWidth}px` : 0,
                        marginRight: isLaptop ? `${playerWidth}px` : 0,
                    }}
                >
                    <div className='min-h-screen py-6 lg:mt-0'>{children}</div>
                    <div
                        style={{
                            right: isLaptop ? '0px' : '-100%',
                            transition: 'all linear 0.3s',
                        }}
                        className={`scroll-none overflow-y-scroll md:w-[300px] w-full max-w-full border-l border-r-third-color px-4 h-screen pt-4 fixed top-0 bottom-0`}
                    >
                        <Player />
                    </div>
                    <Footer />
                </div>
            </div>
            {openFormLogin && <Login />}
            {openFormRegister && <Register />}
        </div>
    );
};

export default MainLayout;
