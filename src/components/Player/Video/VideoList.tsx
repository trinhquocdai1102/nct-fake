import React, { FC, useContext, useEffect, useState } from 'react';
import { Video, VideoPlayerContext } from '../../../context/VideoPlayerContext';
import VideoItem from './VideoItem';

interface VideoListProps {
    videos: Video[];
}

const VideoList: FC<VideoListProps> = ({ videos }) => {
    const { videoList, setVideoList } = useContext(VideoPlayerContext);
    const [data, setData] = useState<any>();
    const handleClick = (video: any) => {
        setVideoList(video);
    };

    useEffect(() => {
        if (videoList) {
            setData(videoList);
        }
    }, [videoList]);

    return (
        <div className='bg-slate-50 h-full'>
            <div className='flex flex-col h-full bg-slate-50 gap-2'>
                {videos
                    ?.filter((item) => item.key !== data?.key)
                    .map((video) => {
                        return (
                            <VideoItem
                                video={video}
                                handleClick={handleClick}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default VideoList;
