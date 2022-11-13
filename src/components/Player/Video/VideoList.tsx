import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Video, VideoPlayerContext } from '../../../context/VideoPlayerContext';
import Switch from '../../Common/Switch';
import VideoPlayerListSkeleton from '../../Skeleton/VideoPlayerListSkeleton';
import VideoItem from './VideoItem';

interface VideoListProps {
    videos: Video[];
}

const VideoList: FC<VideoListProps> = ({ videos }) => {
    const {
        videoList,
        setVideoList,
        autoPlayVideo,
        setAutoPlayVideo,
        currentTime,
        duration,
        setCurrentTime,
        videoRef,
        setVideoPlaying,
    } = useContext(VideoPlayerContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [dataVideo, setDataVideo] = useState<any>([]);
    const [shuffleData, setShuffleData] = useState<any>([]);
    const [currentVideo, setCurrentVideo] = useState<any>();
    const handleClick = (video: any) => {
        setVideoList(video);
        setVideoPlaying(true);
    };

    useEffect(() => {
        if (videoList) {
            setCurrentVideo(videoList);
        }
    }, [videoList]);

    useEffect(() => {
        if (dataVideo) {
            setShuffleData(dataVideo.sort(() => Math.random() - 0.5));
        }
    }, [dataVideo, location]);

    useEffect(() => {
        if (videos) {
            setDataVideo(videos);
        }
    }, [videos]);

    useEffect(() => {
        if (!dataVideo) {
            setDataVideo(videos);
        }
    }, [dataVideo]);

    useEffect(() => {
        if (
            currentTime === duration &&
            autoPlayVideo &&
            shuffleData &&
            duration > 0 &&
            location.pathname.includes('/video/') &&
            location.key !== 'default'
        ) {
            const dataFilter = shuffleData.filter(
                (item: any) => item.key !== currentVideo?.key
            );
            setVideoList(dataFilter[0]);
            setCurrentTime(0);
            setVideoPlaying(true);
            videoRef?.current?.play();
            if (dataFilter[0] && dataFilter[0].key) {
                navigate(`/video/${dataFilter[0]?.key}`);
            }
        }
        if (!duration) {
            setCurrentTime(0);
        }
    }, [currentTime, duration, shuffleData, autoPlayVideo]);

    return (
        <div className='bg-slate-50 h-full'>
            <Switch
                isOn={autoPlayVideo}
                handleToggle={() => setAutoPlayVideo(!autoPlayVideo)}
            />
            {!shuffleData ? (
                <VideoPlayerListSkeleton />
            ) : (
                <div className='flex flex-col h-full bg-slate-50 gap-2'>
                    {shuffleData
                        ?.slice(0, 10)
                        ?.filter((item: any) => item.key !== currentVideo?.key)
                        .map((video: any) => {
                            return (
                                <VideoItem
                                    video={video}
                                    handleClick={handleClick}
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default VideoList;
