import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import moment from 'moment';
import Error from '../../components/Common/Error';
import DetailSkeleton from '../../components/Skeleton/DetailSkeleton';
import { getPlaylistDetail } from '../../apis/playlist';
import SongList from '../../components/Song/SongList';
import { FaPlayCircle } from 'react-icons/fa';
import { useContext } from 'react';
import { SongPlayerContext } from '../../context/SongPlayerContext';

const PlaylistDetail = () => {
    const { key } = useParams();
    const { setSongList, setCurrentIndex } = useContext(SongPlayerContext);

    const { data, error } = useSWR(`playlist-${key}`, () => {
        if (key) {
            return getPlaylistDetail(key);
        }
    });

    const handlePlay = () => {
        if (data && data.playlist) {
            setCurrentIndex(0);
            setSongList(data.playlist.songs);
        }
    };

    if (error) {
        return <Error />;
    }

    return (
        <>
            {!data ? (
                <DetailSkeleton />
            ) : (
                <div className='px-4'>
                    <div className='flex md:flex-row flex-col'>
                        <div className='flex items-center justify-center md:w-auto w-full'>
                            <div className='line w-[238px] max-w-full aspect-[1/1] bg-gray-400 rounded-md'>
                                <img
                                    className='rounded-md'
                                    src={data?.playlist?.thumbnail}
                                />
                                <div
                                    className='absolute w-[44px] h-[44px] rounded-full bg-main-color flex justify-center items-center bottom-[8px] cursor-pointer right-[8px]'
                                    title='Phát tất cả'
                                    onClick={handlePlay}
                                >
                                    <FaPlayCircle className='text-white text-[24px]' />
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5 line'>
                            <div>
                                <div>
                                    <span className='text-zinc-400 text-sm'>
                                        Playlist:{' '}
                                    </span>
                                    <span className='font-bold'>
                                        {data?.playlist?.title}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center mt-4'>
                                <div className='flex items-center mr-3'>
                                    {data?.playlist?.artists?.map(
                                        (item: any) => (
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
                                        )
                                    )}
                                </div>
                                <span className='text-13px text-main-color'>
                                    {data?.playlist?.artists?.map(
                                        (item: any) => {
                                            return (
                                                <Link to='#' key={item.name}>
                                                    {item.name}
                                                    <span className='last:hidden'>
                                                        ,
                                                    </span>
                                                </Link>
                                            );
                                        }
                                    )}
                                </span>
                            </div>
                            <p className='mt-4 text-13px text-main-color font-[400]'>
                                {moment(data?.playlist?.dateCreate).format(
                                    'DD/MM/YYYY'
                                )}
                            </p>
                            <div className='flex mt-[40px]'>
                                <span className='text-main-color text-sm'>
                                    Tags:{' '}
                                </span>
                                <div className='flex items-center flex-wrap gap-1 ml-2'>
                                    {data?.playlist?.listTag?.map(
                                        (item: any) => (
                                            <Link
                                                to='#'
                                                className={`line bg-third-color rounded-l-[4px] px-3 py-[3px] ml-[18px] line-clamp-1 text-sm text-main-color hover:text-second-color before:absolute before:right-[-10px] before:top-0 before:bottom-0 before:h-0 before:w-0 before:border-l-[10px] before:border-b-[14px] before:border-t-[14px] before:rounded-tl-[3px] before:rounded-bl-[3px] before:border-[transparent] before:border-l-third-color`}
                                                key={item.key}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-bg-color mt-[24px] px-[24px] py-[12px]'>
                        <div className='flex gap-[8px] items-center'>
                            <div className='w-[38px] h-[38px] rounded-full truncate text-main-color'>
                                <img
                                    src={data.playlist.uploadBy.avatarUrl}
                                    alt=''
                                />
                            </div>
                            <div>
                                <span className='text-main-color text-13px'>
                                    Tạo bởi:{' '}
                                </span>
                                <p className='font-bold uppercase text-second-color'>
                                    {data.playlist.uploadBy.fullName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-[44px] mb-5 text-xl'>
                        <h1 className='first-letter:capitalize text-[22px] font-bold'>
                            danh sách bài hát
                        </h1>

                        <SongList songs={data?.playlist?.songs} />
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaylistDetail;
