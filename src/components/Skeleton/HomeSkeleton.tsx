import React from 'react';
import BannerSkeleton from './BannerSkeleton';
import SliderSkeleton from './SliderSkeleton';

const HomeSkeleton = () => {
    return (
        <div className='px-4'>
            <BannerSkeleton />
            <SliderSkeleton />
            <SliderSkeleton />
            <SliderSkeleton />
        </div>
    );
};

export default HomeSkeleton;
