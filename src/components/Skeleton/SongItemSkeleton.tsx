import React from 'react';

const SongItemSkeleton = () => {
    return (
        <div className='flex justify-between p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer skeleton mb-1 h-[40px]'></div>
    );
};

export default SongItemSkeleton;
