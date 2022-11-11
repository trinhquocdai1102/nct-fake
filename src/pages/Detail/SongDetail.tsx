import moment from 'moment';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlayCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getLyric, getSong } from '../../apis/song';
import Error from '../../components/Common/Error';
import Lyrics from '../../components/Lyrics';
import DetailSkeleton from '../../components/Skeleton/DetailSkeleton';
import { SongPlayerContext } from '../../context/SongPlayerContext';
import { avatarDefault } from '../../utils/constants';

const SongDetails = () => {
    const { key } = useParams();
    const { setSongList, setCurrentIndex } = useContext(SongPlayerContext);

    const { data, error } = useSWR(`song-${key}`, () => getSong(String(key)));
    const { data: lyric, error: errorLyric } = useSWR(`lyric-${key}`, () =>
        getLyric(String(key))
    );

    const handlePlay = () => {
        if (data) {
            setCurrentIndex(0);
            setSongList([data.song]);
        }
    };

    if (error || errorLyric) {
        return <Error />;
    }

    return (
        <>
            {!data || !lyric ? (
                <DetailSkeleton />
            ) : (
                <div className='px-4'>
                    <div className='flex md:flex-row flex-col'>
                        <div className='flex items-center justify-center md:w-auto w-full'>
                            <div className='line w-[238px] max-w-full aspect-[1/1] bg-gray-400 rounded-md relative'>
                                <LazyLoadImage
                                    src={data?.song?.thumbnail}
                                    alt={data?.song?.title}
                                    width='100%'
                                    height='100%'
                                    className='rounded-md'
                                    effect='blur'
                                />
                                <div
                                    className='absolute w-[44px] h-[44px] rounded-full bg-main-color flex justify-center items-center bottom-[8px] cursor-pointer right-[8px]'
                                    title='Phát'
                                    onClick={handlePlay}
                                >
                                    <FaPlayCircle className='text-white text-[24px]' />
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5'>
                            <div>
                                <div>
                                    <span className='text-main-color'>
                                        Bài hát:
                                    </span>{' '}
                                    <span className='font-bold'>
                                        {data?.song?.title}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center mt-4'>
                                <div className='flex items-center mr-3'>
                                    {data?.song?.artists?.map((item: any) => (
                                        <Link
                                            to={
                                                item.shortLink
                                                    ? `/artist/${item.shortLink}`
                                                    : '#'
                                            }
                                            key={item.artistId}
                                            className='w-5 h-5 bg-gray-500 rounded-full'
                                        >
                                            <img
                                                className='rounded-full'
                                                src={item.imageUrl}
                                            />
                                        </Link>
                                    ))}
                                </div>
                                <div className='text-13px text-main-color'>
                                    {data?.song?.artists
                                        ?.map((item: any) => item.name)
                                        .join(', ')}
                                </div>
                            </div>
                            <p className='mt-4 text-13px text-main-color'>
                                {moment(data?.playlist?.dateCreate).format(
                                    'MMMM D, YYYY'
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-bg-color mt-[24px] px-[24px] py-[12px]'>
                        <div className='flex gap-[8px] items-center'>
                            <div className='w-[38px] h-[38px] rounded-full truncate text-main-color'>
                                <img
                                    src={
                                        data?.song?.uploadBy?.avatarUrl ||
                                        avatarDefault
                                    }
                                    alt='uploadBy'
                                />
                            </div>
                            <div>
                                <span className='text-main-color text-13px'>
                                    Cung cấp bởi:{' '}
                                </span>
                                <p className='font-bold uppercase text-second-color'>
                                    {lyric?.lyric?.userNameUpload}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Lyrics lyric={lyric} />
                </div>
            )}
        </>
    );
};

export default SongDetails;
