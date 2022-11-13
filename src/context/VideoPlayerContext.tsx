import React, { createContext, FC, useEffect, useRef, useState } from 'react';
import { getExplore } from '../apis/explore';
import { IArtist } from '../models';
import useSWRInfinite from 'swr/infinite';

export interface Video {
    title: string;
    thumbnail: string;
    artists: IArtist[];
    key: string;
}

interface VideoPlayerContextState {
    videoList: Video[];
    setVideoList: Function;
    currentIndex: number;
    setCurrentIndex: Function;
    videoRef: any;
    videoPlaying: boolean;
    setVideoPlaying: Function;
    videoMode: boolean;
    setVideoMode: Function;
    allVideo: Video[];
    setAllVideo: Function;
    autoPlayVideo: boolean;
    setAutoPlayVideo: Function;
    currentTime: number;
    setCurrentTime: Function;
    duration: number;
    setDuration: Function;
}

export const VideoPlayerContext = createContext<VideoPlayerContextState>({
    videoList: [],
    setVideoList: () => {},
    currentIndex: 0,
    setCurrentIndex: () => {},
    videoRef: [],
    videoPlaying: false,
    setVideoPlaying: () => {},
    videoMode: false,
    setVideoMode: () => {},
    allVideo: [],
    setAllVideo: () => {},
    autoPlayVideo: true,
    setAutoPlayVideo: () => {},
    currentTime: 0,
    setCurrentTime: () => {},
    duration: 0,
    setDuration: () => {},
});

export const VideoPlayerContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const getKey = (pageIndex: number) => {
        return `explore-mv-${pageIndex + 1}`;
    };

    const { data } = useSWRInfinite(
        getKey,
        (key) => {
            let page = key.split('-')[2];
            return getExplore(Number(page), 'mv');
        },
        { revalidateFirstPage: false }
    );
    const videoRef = useRef<HTMLVideoElement | any>();
    const [videoPlaying, setVideoPlaying] = useState(true);
    const [autoPlayVideo, setAutoPlayVideo] = useState(true);
    const [videoMode, setVideoMode] = useState(false);
    const [allVideo, setAllVideo] = useState<Video[]>([]);
    const [videoList, setVideoList] = useState<Video[]>([]);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const [currentIndex, setCurrentIndex] = useState(
        JSON.parse(localStorage.getItem('nct-current-index') as any) || 0
    );
    useEffect(() => {
        if (data) {
            const arr = data.reduce((final, item) => {
                final.push(...item.data);
                return final;
            }, []);
            setAllVideo(arr);
        }
    }, [data]);

    const VideoPlayerContextData = {
        videoPlaying,
        setVideoPlaying,
        videoList,
        setVideoList,
        currentIndex,
        setCurrentIndex,
        videoRef,
        videoMode,
        setVideoMode,
        allVideo,
        setAllVideo,
        autoPlayVideo,
        setAutoPlayVideo,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
    };

    return (
        <VideoPlayerContext.Provider value={VideoPlayerContextData}>
            {children}
        </VideoPlayerContext.Provider>
    );
};
