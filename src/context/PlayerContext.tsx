import React, { createContext, FC, useState } from 'react';
import { IArtist } from '../models';

export interface Song {
    title: string;
    thumbnail: string;
    artists: IArtist[];
    key: string;
}

interface PlayerContextState {
    songIds: Song[];
    setSongIds: Function;
    currentIndex: number;
    setCurrentIndex: Function;
}

export const PlayerContext = createContext<PlayerContextState>({
    songIds: [],
    setSongIds: () => {},
    currentIndex: 0,
    setCurrentIndex: () => {},
});

const PlayerContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [songIds, setSongIds] = useState<Song[]>(
        JSON.parse(localStorage.getItem('nct-current-list-song') as any) || []
    );
    const [currentIndex, setCurrentIndex] = useState(
        JSON.parse(localStorage.getItem('nct-current-index') as any) || 0
    );

    const PlayerContextData = {
        songIds,
        setSongIds,
        currentIndex,
        setCurrentIndex,
    };

    return (
        <PlayerContext.Provider value={PlayerContextData}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
