import React, { FC, Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Video } from '../../../context/VideoPlayerContext';

interface VideoItemProps {
    video: Video;
    handleClick: (video: any) => void;
}

const VideoItem: FC<VideoItemProps> = ({ video, handleClick }) => {
    return (
        <div className='flex flex-col gap-1' key={video.key}>
            <Link to={`video/${video.key}`} onClick={() => handleClick(video)}>
                <div className='rounded-sm overflow-hidden'>
                    <LazyLoadImage
                        src={video.thumbnail}
                        alt={video.title}
                        className='w-full rounded-sm'
                    />
                </div>
            </Link>
            <div>
                <Link
                    to={`video/${video.key}`}
                    onClick={() => handleClick(video)}
                >
                    <p className='truncate text-sm font-medium'>
                        {video.title}
                    </p>
                </Link>

                <p className='truncate text-xs text-main-color'>
                    {video.artists.map((artist) => {
                        return (
                            <Fragment key={artist.artistId}>
                                <Link
                                    to={
                                        artist.shortLink
                                            ? `/artist/${artist.shortLink}`
                                            : 'not-found'
                                    }
                                >
                                    {artist.name}
                                </Link>
                                <span className='last:hidden'>, </span>
                            </Fragment>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};

export default VideoItem;
