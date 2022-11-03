import React from 'react';
import SongListSkeleton from './SongListSkeleton';
import SliderSkeleton from './SliderSkeleton';

const ResultsSkeleton = () => {
    return (
        <div>
            <h1 className='mb-5 font-semibold text-2xl h-8 skeleton'></h1>

            <SongListSkeleton />
            <SliderSkeleton />
            <SliderSkeleton />
        </div>
    );
};

export default ResultsSkeleton;
