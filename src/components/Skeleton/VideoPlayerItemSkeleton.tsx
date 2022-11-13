import React from 'react';

const VideoPlayerItemSkeleton = () => {
    return (
        <div>
            <div className={`rounded-md skeleton h-[140px]`}></div>
            <div className={`rounded-md skeleton h-[28px] my-1`}></div>
            <div className={`rounded-md skeleton h-[20px]`}></div>
        </div>
    );
};

export default VideoPlayerItemSkeleton;
