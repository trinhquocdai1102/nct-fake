import React, { FC, Fragment, useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { imgNotFound } from '../../utils/constants';

interface PlaylistProps {
    data: any;
    custom?: boolean;
}

const Playlist: FC<PlaylistProps> = ({ data, custom }) => {
    return (
        <div className='grid md:grid-cols-4 grid-cols-4 gap-2'>
            {data?.map((item: any) => (
                <Fragment key={item.key}>
                    <div className='p-[8px]'>
                        {custom && (
                            <>
                                <div className='w-[60%] h-[6px] ml-[20%] rounded-tl-[4px] rounded-tr-[4px] bg-third-color'></div>
                                <div className='w-[80%] h-[6px] ml-[10%] rounded-tl-[4px] rounded-tr-[4px] bg-[rgba(28,30,32,0.1)]'></div>
                            </>
                        )}
                        <Link
                            to={
                                item.type
                                    ? `/${item.type.toLowerCase()}/${item.key}`
                                    : '#'
                            }
                            className={`block w-full rounded-md hover-animation overflow-hidden`}
                        >
                            <div className='hover:scale-[1.1] ease-in duration-[400ms] cursor-pointer'>
                                <LazyLoadImage
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = imgNotFound;
                                    }}
                                    src={item.thumbnail ?? imgNotFound}
                                    alt={item.title}
                                    width='100%'
                                    height='100%'
                                    className='rounded-md shadow-main line'
                                    effect='blur'
                                />
                                <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-[40px] text-white hidden'>
                                    <div
                                        className='hover:scale-[1.2] brightness-100 duration-[400ms]'
                                        title='Phát'
                                    >
                                        <AiFillPlayCircle />
                                    </div>
                                </div>
                            </div>
                        </Link>
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
            ))}
        </div>
    );
};

export default Playlist;
