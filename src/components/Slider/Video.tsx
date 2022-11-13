import React, { FC, Fragment } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { imgNotFound } from '../../utils/constants';

interface VideoSliderProps {
    data: any;
}

const Video: FC<VideoSliderProps> = ({ data }) => {
    return (
        <div className='flex flex-wrap video-hot'>
            {data?.slice(0, 6).map((item: any) => {
                return (
                    <Fragment key={item.key}>
                        <div>
                            <Link
                                to={
                                    item.type
                                        ? `/${item.type.toLowerCase()}/${
                                              item.key
                                          }`
                                        : '#'
                                }
                            >
                                <div className='line overflow-hidden w-full'>
                                    <div className='hover:scale-[1.1] ease-in duration-[400ms]'>
                                        <LazyLoadImage
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = imgNotFound;
                                            }}
                                            src={item.thumbnail ?? imgNotFound}
                                            alt={item.title}
                                        />
                                        <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-[40px] text-white hidden'>
                                            <div className='hover:scale-[1.2] brightness-100 '>
                                                <AiFillPlayCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='absolute right-[10px] bottom-[8px] text-[10px] text-white bg-main-color px-2 rounded'>
                                        {item.duration}
                                    </div>
                                </div>
                            </Link>
                            <div className='mt-1'>
                                <Link
                                    to={
                                        item.type
                                            ? `/${item.type.toLowerCase()}/${
                                                  item.key
                                              }`
                                            : '#'
                                    }
                                >
                                    <p className='truncate text-sm font-medium cursor-pointer hover:text-second-color'>
                                        {item.title}
                                    </p>
                                </Link>
                                <div className='text-13px text-main-color'>
                                    <p className='truncate'>
                                        {item.artists.map((artist: any) => {
                                            return (
                                                <Fragment key={artist.artistId}>
                                                    <Link
                                                        to={
                                                            artist.shortLink
                                                                ? `/artist/${artist.shortLink}`
                                                                : 'not-found'
                                                        }
                                                        className='hover:text-second-color cursor-pointer'
                                                    >
                                                        {artist.name}
                                                    </Link>
                                                    <span className='last:hidden'>
                                                        ,{' '}
                                                    </span>
                                                </Fragment>
                                            );
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default Video;
