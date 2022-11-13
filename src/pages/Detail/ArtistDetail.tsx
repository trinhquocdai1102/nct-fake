import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getArtistDetails } from '../../apis/artist';
import Error from '../../components/Common/Error';
import Playlist from '../../components/Playlist';
import ArtistDetailSkeleton from '../../components/Skeleton/ArtistDetailSkeleton';
import Slider from '../../components/Slider';
import SongList from '../../components/Song/SongList';
import { avatarDefault } from '../../utils/constants';

const ArtistDetail = () => {
    const { key } = useParams();
    const [segmentedValue, setSegmentedValue] = useState({
        name: 'Trang chủ',
        item: 'full',
    });

    const { data, error } = useSWR(`playlist-${key}`, () => {
        if (key) {
            return getArtistDetails(key);
        }
    });

    if (error) {
        return <Error />;
    }

    const segmented = [
        { name: 'Trang chủ', item: 'full' },
        { name: 'Bài hát', item: 'song' },
        { name: 'MV', item: 'video' },
        { name: 'Playlist', item: 'playlist' },
        { name: 'Giới thiệu', item: 'about' },
    ];

    return (
        <>
            {!data ? (
                <ArtistDetailSkeleton />
            ) : (
                <div className='px-[40px]'>
                    <div>
                        <img
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = avatarDefault;
                            }}
                            src={data?.artist?.coverImageURL ?? avatarDefault}
                            alt={data?.artist?.name}
                        />
                    </div>
                    <div>
                        <ul className='flex items-center justify-center mt-[24px] pt-[16px] font-bold text-13px border-b'>
                            {segmented.map((item) => {
                                return (
                                    <li
                                        key={item.name}
                                        onClick={() =>
                                            setSegmentedValue({
                                                name: item.name,
                                                item: item.item,
                                            })
                                        }
                                        className={`mx-[4px] w-[15%] max-w-[120px] min-w-[80px] h-[48px] flex items-center justify-center cursor-pointer custom-border-bottom ${
                                            item.name === segmentedValue.name
                                                ? 'show-border-bottom'
                                                : ''
                                        }`}
                                    >
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>
                        <div>
                            <div
                                className={`mb-5 line mt-[40px] ${
                                    segmentedValue.item === 'full'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <h1 className='mb-4 font-semibold text-[22px]'>
                                    Gần đây
                                </h1>
                                <Slider
                                    banners={data?.songNearly}
                                    spacer={20}
                                />
                            </div>
                            <div
                                className={`mb-5 mt-[40px] ${
                                    segmentedValue.item === 'full' ||
                                    segmentedValue.item === 'song'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <h1 className='mb-4 font-semibold text-[22px]'>
                                    Bài hát{' '}
                                    {segmentedValue.item === 'song' && (
                                        <span className='text-main-color text-sm'>
                                            ({data?.song?.total} kết quả)
                                        </span>
                                    )}
                                </h1>
                                <SongList songs={data?.song?.song} perRow={2} />
                            </div>
                            <div
                                className={`mb-5 mt-[40px] ${
                                    segmentedValue.item === 'full' ||
                                    segmentedValue.item === 'playlist'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <h1 className='mb-4 font-semibold text-[22px]'>
                                    Playlist{' '}
                                    {segmentedValue.item === 'playlist' && (
                                        <span className='text-main-color text-sm'>
                                            ({data?.playlist?.total} kết quả)
                                        </span>
                                    )}
                                </h1>
                                <Playlist
                                    data={data?.playlist?.playlist}
                                    custom={true}
                                />
                            </div>
                            <div
                                className={`mb-5 line mt-[40px] ${
                                    segmentedValue.item === 'full' ||
                                    segmentedValue.item === 'video'
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <h1 className='mb-4 font-semibold text-[22px]'>
                                    Video Hot{' '}
                                    {segmentedValue.item === 'video' && (
                                        <span className='text-main-color text-sm'>
                                            ({data?.playlist?.total} kết quả)
                                        </span>
                                    )}
                                </h1>
                                <Slider
                                    video={true}
                                    banners={data?.video?.video}
                                />
                            </div>
                            <div
                                className={`mb-5 line mt-[40px] ${
                                    segmentedValue.item !== 'about' && 'hidden'
                                }`}
                            >
                                <div>
                                    <p>không có data nên chịu :( </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ArtistDetail;
