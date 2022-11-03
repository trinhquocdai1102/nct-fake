import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import moment from 'moment';
import Error from '../../components/Common/Error';
import DetailSkeleton from '../../components/Skeleton/DetailSkeleton';
import { getPlaylistDetail } from '../../apis/playlist';
import SongList from '../../components/Song/SongList';
import { BsFillPlayCircleFill } from 'react-icons/bs';

const PlaylistsDetail = () => {
    const { key } = useParams();

    const { data, error } = useSWR(`playlist-${key}`, () => {
        if (key) {
            return getPlaylistDetail(key);
        }
    });

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
                                    className='text-white absolute text-[24px] bottom-[12px] right-[12px] p-2 bg-[rgba(0,0,0,0.2)] rounded-full cursor-pointer'
                                    title='Phát tất cả'
                                >
                                    <BsFillPlayCircleFill />
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5 line'>
                            <div>
                                <div>
                                    <span className='text-zinc-400 text-sm'>
                                        Playlist:{' '}
                                    </span>
                                    <span className='font-[700]'>
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
                                                        ? `/ARTIST/${item.shortLink}`
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
                        <h1 className='first-letter:capitalize text-[22px] font-[700]'>
                            danh sách bài hát
                        </h1>

                        <SongList songs={data?.playlist?.songs} />
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaylistsDetail;
