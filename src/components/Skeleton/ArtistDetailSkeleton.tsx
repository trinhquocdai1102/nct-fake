import React from 'react';
import BannerSkeleton from './BannerSkeleton';
import SliderSkeleton from './SliderSkeleton';
import SongListSkeleton from './SongListSkeleton';

const ArtistDetailSkeleton = () => {
    return (
        <div className='px-4'>
            <BannerSkeleton />
            <SliderSkeleton />
            <SongListSkeleton perRow={2} />
        </div>
    );
};

export default ArtistDetailSkeleton;
