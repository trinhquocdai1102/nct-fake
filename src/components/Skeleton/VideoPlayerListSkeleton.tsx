import React from 'react';
import VideoPlayerItemSkeleton from './VideoPlayerItemSkeleton';

const VideoPlayerListSkeleton = () => {
    return (
        <div className='flex flex-col gap-4'>
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
            <VideoPlayerItemSkeleton />
        </div>
    );
};

export default VideoPlayerListSkeleton;
