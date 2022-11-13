import React, { FC } from 'react';
import SongItemSkeleton from './SongItemSkeleton';
import SongItem2Skeleton from './SongItem2Skeleton';

interface SongListSkeletonProps {
    perRow?: number;
}

const SongListSkeleton: FC<SongListSkeletonProps> = ({ perRow }) => {
    return (
        <div className='my-5'>
            <div>
                <h1 className='w-[200px] h-6 mt-4 skeleton'></h1>
            </div>

            {perRow === 2 ? (
                <div className='grid md:grid-cols-2 grid-cols-1 gap-2 mt-4'>
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                    <SongItem2Skeleton />
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default SongListSkeleton;
