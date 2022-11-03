import React from 'react';
import SongItemSkeleton from './SongItemSkeleton';

const SongListSkeleton = () => {
    return (
        <div className='my-5'>
            <div>
                <h1 className='w-[200px] h-6 mt-4 skeleton'></h1>
            </div>

            <div className='mt-4'>
                <div className='flex justify-between p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer skeleton mb-1 h-[32px]'></div>
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
                <SongItemSkeleton />
            </div>
        </div>
    );
};

export default SongListSkeleton;
