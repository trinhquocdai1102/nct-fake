import { collection } from 'firebase/firestore';
import React, { createContext, FC, useCallback, useRef, useState } from 'react';
import { db } from '../config/firebase';
import { IArtist, ISong } from '../models';

export interface Song {
    title: string;
    thumbnail: string;
    artists: IArtist[];
    key: string;
}

interface SongPlayerContextState {
    songList: Song[];
    setSongList: Function;
    currentIndex: number;
    setCurrentIndex: Function;
    audioRef: any;
    audioPlaying: boolean;
    setAudioPlaying: Function;
    handlePlayPause: () => void;
    favoriteCollection: any;
    favoriteList: ISong[];
    setFavoriteList: Function;
}

export const SongPlayerContext = createContext<SongPlayerContextState>({
    songList: [],
    setSongList: () => {},
    currentIndex: 0,
    setCurrentIndex: () => {},
    audioRef: [],
    audioPlaying: false,
    setAudioPlaying: () => {},
    handlePlayPause: () => {},
    favoriteCollection: {},
    favoriteList: [],
    setFavoriteList: () => {},
});

const SongPlayerContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const audioRef = useRef<HTMLAudioElement | any>();
    const favoriteCollection = collection(db, 'favorites');
    const [favoriteList, setFavoriteList] = useState<ISong[]>([]);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [songList, setSongList] = useState<Song[]>(
        JSON.parse(localStorage.getItem('nct-current-list-song') as any) || []
    );

    const [currentIndex, setCurrentIndex] = useState(
        JSON.parse(localStorage.getItem('nct-current-index') as any) || 0
    );

    const handlePlayPause = useCallback(() => {
        if (audioPlaying) {
            audioRef.current.pause();
            setAudioPlaying(false);
        } else {
            audioRef.current.play();
            setAudioPlaying(true);
        }
    }, [audioPlaying]);

    const SongPlayerContextData = {
        songList,
        setSongList,
        currentIndex,
        setCurrentIndex,
        audioRef,
        audioPlaying,
        setAudioPlaying,
        handlePlayPause,
        favoriteCollection,
        favoriteList,
        setFavoriteList,
    };

    return (
        <SongPlayerContext.Provider value={SongPlayerContextData}>
            {children}
        </SongPlayerContext.Provider>
    );
};

export default SongPlayerContextProvider;
