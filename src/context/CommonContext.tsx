import React, { FC, useRef, useState } from 'react';

interface CommonContextState {
    openPlayer: boolean;
    setOpenPlayer: Function;
    openSidebar: boolean;
    setOpenSidebar: Function;
    playerRef: any;
    sidebarRef: any;
    mobileControlPlayerRef: any;
    mobilePlayerRef: any;
}

export const CommonContext = React.createContext<CommonContextState>({
    openPlayer: false,
    setOpenPlayer: () => {},
    openSidebar: false,
    setOpenSidebar: () => {},
    playerRef: [],
    sidebarRef: [],
    mobileControlPlayerRef: [],
    mobilePlayerRef: [],
});

export const CommonContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [openPlayer, setOpenPlayer] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const playerRef = useRef<HTMLDivElement | any>();
    const sidebarRef = useRef<HTMLDivElement | any>();
    const mobileControlPlayerRef = useRef<HTMLDivElement | any>();
    const mobilePlayerRef = useRef<HTMLDivElement | any>();

    const CommonContextData = {
        openPlayer,
        setOpenPlayer,
        openSidebar,
        setOpenSidebar,
        playerRef,
        sidebarRef,
        mobileControlPlayerRef,
        mobilePlayerRef,
    };

    return (
        <CommonContext.Provider value={CommonContextData}>
            {children}
        </CommonContext.Provider>
    );
};
